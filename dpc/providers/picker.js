angular
    .module('pickerProvider', [])
    .directive('uiDateTimePicker', function (){
        var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/;

        return {
            scope: true,
            controller: function ($scope, $element, $attrs, $parse, $timeout) {
                var dpcModelGet = $parse($attrs.dpcModel),
                    dpcModelSet = dpcModelGet.assign,
                    optionsExp = $attrs.uiDateTimePicker,
                    match;

                if (match = optionsExp.match(NG_OPTIONS_REGEXP)) {
                    var displayFn = $parse(match[2] || match[1]),
                        valueName = match[4] || match[6],
                        keyName = match[5],
                        valueFn = $parse(match[2] ? match[1]: valueName),
                        valuesFn = $parse(match[7]),
                        valFrom = function (v) {
                            var locals = {};
                            locals[valueName] = v;
                            return valueFn($scope, locals);
                        },
                        findCurrent = function (asIndex) {
                            var key = dpcModelGet($scope),
                                vals = valuesFn($scope);
                            if (match[2]) {
                                var inv = -1;
                                $.each(vals, function (i, v) {
                                    var val = valFrom(v);
                                    if (val == key) {
                                        inv = i;
                                    }
                                });
                                return asIndex ? inv: (inv >= -1 ? vals[inv]: null);
                            } else {
                                return asIndex ? $.inArray(key, vals): key;
                            }
                        },
                        display = function () {
                            var locals = {},
                                key = findCurrent(false);
                            if (keyName) {
                                locals[keyName] = key;
                            }
                            locals[valueName] = key;
                            $scope.display = displayFn($scope, locals);
                        },
                        inc = function (n) {
                            var inv = findCurrent(true),
                                vals = valuesFn($scope);
                            inv += (n > 0) ? 1: -1;
                            inv = (inv < 0) ? (vals.length - 1): ((inv >= vals.length) ? 0: inv);
                            dpcModelSet($scope.$parent, valFrom(vals[inv]));
                            display();
                        };

                    $scope.$watch(dpcModelGet, display);
                    $scope.$watch(valuesFn, display);

                    $scope.down = function () {
                        if(!$element.hasClass('disabled')) {
                            inc(-1);
                        }
                    };

                    $scope.up = function () {
                        if(!$element.hasClass('disabled')) {
                            inc(1);
                        }
                    };

                } else {
                    throw Error("Expected uiDateTimePicker in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" + " but got '" + optionsExp + "'.");
                }
            }
        };
    })
    .directive('uiTimePicker', function ($timeout, $log, scheduleUtil) {
        return {
            scope: {
                'dpcModel': '=',
                'dpcDisabled': '='
            },
            replace: true,
            templateUrl: 'views/picker/time.htm',
            controller: function ($scope, $element, $attrs) {

                try {
                    $scope.hours   = [12,1,2,3,4,5,6,7,8,9,10,11];
                    $scope.minutes = $.map(new Array(60), function(k, v){
                    	return String(v>9?v:'0'+v);
                    });

                    var dtg, name = $attrs.uiTimePicker || 'uiTimePicker_' + $scope.$id, active = false,
                        build  = function (model) { // $log.warn('uiTimePicker::build:model', model);
                            var STA = scheduleUtil.parseLocaleISOString(model);

                            $scope.uhour = STA[4] && Number(STA[4]) || 0;
                            var minute = STA[5] && String(STA[5]) || '00';
                            if ($scope.minutes.indexOf(minute) < 0) {
                                minute = $scope.minutes[0];
                            }

                            $scope.model = {
                                hour    : $scope.uhour % 12 || 12,
                                minute  : minute,
                                meridian: function () { return ($scope.uhour < 12); }()
                            };
                        };

                    $scope.$watch(
                        function () { return $scope.model; },
                        function (model) {
                            if (model && (model.hour && model.minute)) { //$log.info('model', model);

                                $scope.uhour =  model.meridian ? ( model.hour == 12 ? 0: model.hour ) : (model.hour == 12 ? 12: model.hour + 12);

                                if(active) {
                                    dtg = scheduleUtil.dtgLocaleISOString(scheduleUtil.parseLocaleISOString($scope.dpcModel));
                                    dtg.setHours($scope.uhour, Number(model.minute), 0);
                                    $scope.$emit('uiTimePickerUpdate', {
                                    	name: name,
                                    	value: scheduleUtil.toLocaleISOString(dtg)
                                    });
                                    //$scope.dpcModel = scheduleUtil.toLocaleISOString(dtg);
                                }
                                active = true;
                            }
                        },
                    true);

                    $scope.$watch(
                        function () { return $scope.dpcModel; },
                        function (dpcModel) { //$log.info('uiTimePicker::dpcModel', dpcModel);
                            if (dpcModel) {
                                build(dpcModel);
                            }
                        },
                    true);

                } catch (e) {
                    $log.warn('uiTimePicker::controller');
                    $log.error(e);
                }
            }
        };
    })
    .directive('uiMinical', function ($timeout, $parse, $log, utilities, scheduleUtil, $cal) {
        return {
            scope: {
                'dpcModel': '=',
                'gbBookends': '=',
                'dpcDisabled': '='
            },
            templateUrl: 'views/picker/minical.htm',
            controller: function ($scope, $element, $attrs) {

                try {
                    function Changer (value) {
                        var $this   = this;
                        this.value  = value;
                        this.active = true;
                        this.click  = function () {
							var date = $scope.Calendar.dtg.getDate(), daysin;
							$scope.Calendar.dtg.setDate(1);
							$scope.Calendar.dtg.setMonth( ($scope.Calendar.dtg.getMonth() + this.value) );
							daysin = $cal.daysIn($scope.Calendar.dtg.getFullYear(), $scope.Calendar.dtg.getMonth());
							date = (date > daysin) ? daysin:date;
							$scope.Calendar.dtg.setDate(date);
							$scope.Calendar.Month.UI.Prev.check();
							$scope.Calendar.Month.UI.Next.check();
                        };
                        this.check  = function () {
                            var year, years = $scope.Calendar.Year.years, proposed = $cal.cloneDate($scope.Calendar.dtg);
                            proposed.setMonth( (proposed.getMonth() + $this.value) );
                            proposed.setDate(1);
                            year = proposed.getFullYear();
                            $this.active = ( (year >= years[0] && year <= years[years.length - 1]) );
                            return this;
                        };
                        return this;
                    }

                    $scope.Calendar = {
                        dtg: null, dstr: '', bookends: null,
                        UI: {
                            opened: false,
                            kill: function () {
								angular.element(document.querySelector('body')).unbind('keydown', eskape);
								$scope.Calendar.dtg  = null;
								$scope.Calendar.dstr = '';
                            	$timeout(function() {
									$scope.Calendar.UI.opened = false;
								});
                            },
                            toggle: function () {
                                this.opened = !this.opened;
                                if (this.opened) {
                                    $timeout(function () {
                                        $scope.Calendar.dtg  = $scope.dpcModel && scheduleUtil.dtgLocaleISOString(scheduleUtil.parseLocaleISOString($scope.dpcModel)) || $cal.cloneDate();
                                        $scope.Calendar.dstr = $scope.dpcModel && scheduleUtil.fromIsoDate($scope.dpcModel) || '';
                                    });
                                    angular.element(document.querySelector('body')).bind('keydown', eskape);
                                }
                            }
                        },
                        Day: {
                            value: 0, is: function (value) { return (this.value === value); }
                        },
                        Month: {
                            value: 0, weeks: [],
                            UI: {Prev: new Changer(-1), Next: new Changer(1)}
                        },
                        Year: {
                            value: 0, years: [],
                            change: function () {
                                var fn, year = this.value, years = this.years.slice(0),
                                    disposition = (year === years.pop()) ? 'late': ((year === years[0]) ? 'early': null);
                                $scope.Calendar.dtg.setFullYear(year);
                                fn = disposition && {
                                    early: function () {
                                        if (!$scope.Calendar.Month.UI.Prev.check().active) {
                                            $scope.Calendar.dtg.setMonth($cal.today.getMonth());
                                        }
                                    },
                                    late: function () {
                                        if (!$scope.Calendar.Month.UI.Next.check().active) {
                                            $scope.Calendar.dtg.setMonth($cal.today.getMonth());
                                        }
                                    }
                                }[disposition]() || null;
                            }
                        }
                    };

                    //$log.log($scope.Calendar);

                    var name = $attrs.uiMinical || 'uiMinical_' + $scope.$id,
                    	bookends = $scope.gbBookends && $.map($scope.gbBookends.split(','), function (bookend) { return scheduleUtil.fromIsoDate(bookend); }) || [],
                    	updateModel = function (date) {
                        if (date) {
                            var dtg = $cal.cloneDate($scope.Calendar.dtg),
                            parts = scheduleUtil.parseLocaleISOString($scope.dpcModel);
                            if (parts) {
                                dtg.setHours(Number(parts[4]), Number(parts[5]), 0);
                            }
                            dtg.setDate(date);
                            $scope.$emit('uiMinicalUpdate', {
                            	name: name,
                            	value: scheduleUtil.toLocaleISOString(dtg)
                            });
                        }
                        $timeout(function () {
                            $scope.Calendar.UI.toggle();
                        });
                    },
                    buildYears = function () {
                        var years = [], start = $cal.cloneDate(), end = $cal.cloneDate(start), s, e;
                        start.setMonth( (start.getMonth() - (5*12)) );
                        end.setMonth( (end.getMonth() + (5*12)) );
                        s = start.getFullYear();
                        e = end.getFullYear();
                        for (i = s; i <= e; i++) {
                            years.push(i);
                        }
                        return years;
                    },
                    addWeek = function (week) {
                        $scope.Calendar.Month.weeks.push(week);
                    },
                    buildWeeks = function () {
                        // reset params
                        $scope.Calendar.Month.weeks = [];
                        $scope.Calendar.Day.value = 0;

                        var dtg = $cal.cloneDate($scope.Calendar.dtg),
                            M = $scope.Calendar.dtg.getMonth(),
                            i, l, week = [], weeks = [],
                            dayObj = {
                                date: null, day: null, selected: false, disabled: false,
                                select: function () {
                                    $scope.Calendar.Day.value = this.date;
                                    updateModel(this.date);
                                }
                            };

                        dtg.setDate(1);

                        l = dtg.getOffsetDay();
                        i = (l-1);

                        // adds blanks to beginning of month
                        for (; i >= 0; i--) { week.push(dayObj); }

                        // adds days to month
                        do {
                            var d = $.extend({}, dayObj, {
                                date: dtg.getDate(),
                                day: dtg.getOffsetDay(),
                                disabled: bookended(dtg),
                                selected: (scheduleUtil.jsDateAsStringDate(dtg) === $scope.Calendar.dstr)
                            });
                            week.push(d);
                            if (d.day === 6) {
                                addWeek(week);
                                week = [];
                            }
                            dtg.setDate((dtg.getDate() + 1));
                        } while(dtg.getMonth() === M);

                        // adds blanks to end of month
                        if (week.length > 0) {
                            l = week.length;
                            for (i = l; i < 7; i++) { week.push(dayObj); }
                            addWeek(week);
                        }
                    },
                    track = function (e) {
                        e.stopPropagation();
                        $element.hover(
                            function (e) {e.stopImmediatePropagation();},
                            function (e) {
                                e.stopPropagation();
                                $scope.Calendar.UI.kill();
                            }
                        );
                    },
                    eskape = function (e) {
                        var code = (e.keyCode ? e.keyCode : e.which);
                        if([27].indexOf(code) > -1) {
                            e.stopPropagation();
                            $scope.Calendar.UI.kill();
                        }
                    },
                    bookended = function (dtg) {
                    	if (!bookends.length) {
                    		return false;
                    	}
                    	var strDate = scheduleUtil.jsDateAsStringDate(dtg);
						return (bookends[0] > strDate || (bookends[1] && bookends[1] < strDate));
                    };

                    $scope.Calendar.Year.years = buildYears();

                    /**
                     * Build Calendar every time the date object changes.
                     */
                    $scope.$watch(
                        function () { return $scope.Calendar.dtg && $scope.Calendar.dtg.getTime(); },
                        function (time) {
                            if (angular.isDate($scope.Calendar.dtg)) { // $log.log('DTG', dtg);
                            	var dtg = $scope.Calendar.dtg;
                                $scope.Calendar.Month.value = dtg.getMonth();
                                $scope.Calendar.Year.value  = dtg.getFullYear();
                                $timeout(function () {
                                    buildWeeks();
                                    $scope.Calendar.Day.value = dtg.getDate();
                                    $scope.Calendar.Month.UI.Prev.check();
                                    $scope.Calendar.Month.UI.Next.check();
                                });
                            }
                        },
                    true);

                    /**
                     * Auto closes the calendar if disabled.
                     */
                     $scope.$watch(
                         function () { return $scope.dpcDisabled; },
                         function (bool) { if (bool) { $scope.Calendar.UI.opened = false; } },
                     true);

                    /**
                     * Debug Model changes.
                     */ //$scope.$watch(function () { return $scope.dpcModel; },function (model) {if (model) {$timeout(function () {$log.log('dpcModel', model);});}},true);

                } catch (e) {
                    $log.warn('uiMinical::controller');
                    $log.error(e);
                }
            }
        };
    })
    .filter('monthToString', function ($cal) {
        return function (month) {
            return $cal.getMonthLong(month);
        };
    })
;