/**
 * Schedule Provider
 */
angular
    .module('scheduleProvider', [])
    .factory('scheduleUtil', function ($log, $cal) {

        var asMonth = function (d) {
                return $cal.getMonthShort(Number(d)-1);
            },
            asOrdinal = function (n) {
                n = Number(n);
                var b = n % 10, a = (n - b) / 10;
                return n + ['th', 'st', 'nd', 'rd'][((a === 1) || (b > 3)) ? 0: b];
            },
            smin = function (a, b) {
                return a < b ? a: b;
            },
            smax = function (a, b) {
                return a > b ? a: b;
            },
            toSprintFormat = function (string) {
                var strings = string.split('T');
                var date = /^(\w{2,4})[\/\-](\w{1,2})[\/\-](\w{1,2})$/i.exec(strings[0]).splice(1),
                    time = strings[1] ? /^(\w{1,2})[\/\:](\w{1,2})$/i.exec(strings[1]).splice(1) : [];
                $.each(date, function (i, seg) {
                    var l = seg.length;date[i] = l > 2 ? "%d":(l > 1 ? "%02d":"%01d");
                });
                $.each(time, function (i, seg) {
                    var l = seg.length;time[i] = l > 1 ? "%02d":"%01d";
                });
                return time.length ? [date.join('-'), time.join(':')].join('T'):date.join('-');
            },
            toLocaleISOString = function (dtg) {
                return $.sprintf("%d-%02d-%02dT%02d:%02d", dtg.getFullYear(), dtg.getMonth()+1, dtg.getDate(), dtg.getHours(), dtg.getMinutes());
            },
            parseLocaleISOString = function (string) {
                var args = /(\d+)-(\d?\d)-(\d?\d)T(\d?\d):(\w?\w)?/i.exec(string);
                return args;
            },
            dtgLocaleISOString = function (args) {
                return $cal.dtg(Number(args[1]), Number(args[2])-1, Number(args[3]), Number(args[4]), Number(args[5]));
            },
            stringDateAsNiceDate = function (str) {
                if (!str) return;
                str = str.split('T')[0];
                str = str.split('-');
                return $.sprintf("%s %s, %d", asMonth(str[1]), asOrdinal(str[2]), str[0]) || '';
            },
            jsDateAsStringDate = function (dtg) {
                dtg = dtg || $cal.cloneDate();
                return $.sprintf("%d-%02d-%02d", dtg.getFullYear(), dtg.getMonth() + 1, dtg.getDate());
            },
            jsTimeAsStringTime = function (dtg) {
                dtg = dtg || $cal.cloneDate();
                return $.sprintf("%02d:%02d", dtg.getHours(), dtg.getMinutes());
            },
            stringDateAsJsDate = function (str) {
                str = str.split('T')[0];
                str = str.split('-');
                return $cal.dtg(Number(str[0]), Number(str[1])-1, Number(str[2]));
            },
            stringTimeAsNiceTime = function (str) {
                if (!str) return;
                if (str.indexOf('T') > -1) {
                    str = str.split('T')[1];
                }
                str = str.split(':');

                var uh = parseInt(str[0], 10),
                    n = str[1];

                if ((uh === 12) && (n === '00')) {
                    return '12 noon';
                } else if ((uh === 0) && (n === '00')) {
                    return 'midnight';
                } else {
                    var m = (uh >= 12) ? 'pm':'am',
                        h = (uh > 12) ? uh - 12:uh;
                    return $.sprintf("%d:%s%s", h, n, m);
                }
            },
            asNiceDateRange = function (start, end) {
                var rv,
                processDate = function (str) {
                    str = str.split('T')[0];
                    str = str.split('-');
                    str[1] = asMonth(str[1]);
                    str[2] = Number(str[2])
                    return str;
                },
                start = processDate(start), end = processDate(end);

                return ((start[0] === end[0]) ?
                        ( (start[1] === end[1]) ?
                          (start[2] === end[2]) ?
                          [start[1], asOrdinal(start[2]) + ',', start[0] ] :
                          [start[1], asOrdinal(start[2]), ( (start[2] + 1) === end[2]) ? 'and' : 'to' , asOrdinal(end[2]) + ',', start[0] ]
                          :
                          [start[1], asOrdinal(start[2]), 'to', end[1], asOrdinal(end[2]) + ',', end[0] ])
                        : [start[1], asOrdinal(start[2]) + ',', start[0], 'to', end[1], asOrdinal(end[2]) + ',', end[0] ]).join(' ');
            },
            fromIsoDate = function (d) {
                return d && d.split('T')[0];
            },
            fromIsoTime = function (t) {
                return t && t.split('T').pop();
            };

        return {
            jsDateAsStringDate   : jsDateAsStringDate,
            jsTimeAsStringTime   : jsTimeAsStringTime,
            stringDateAsJsDate   : stringDateAsJsDate,
            stringDateAsNiceDate : stringDateAsNiceDate,
            stringTimeAsNiceTime : stringTimeAsNiceTime,
            asNiceDateRange      : asNiceDateRange,
            toLocaleISOString    : toLocaleISOString,
            parseLocaleISOString : parseLocaleISOString,
            dtgLocaleISOString   : dtgLocaleISOString,
            toSprintFormat       : toSprintFormat,
            fromIsoDate          : fromIsoDate,
            fromIsoTime          : fromIsoTime
        };
    })
    .controller('scheduleInstanceController', function ($scope, $rootScope, $timeout, $log, $cal, scheduleUtil) {

        var $this, index = 0, instance = null, STARTTIME = '00:00',
            update = function () {
                var when = {};
                angular.forEach(['date','time'], function (node) {
                    if($this[node]) {
                        this[node] = $this[node];
                    }
                }, when);

                instance.update(when);
                $scope.Schedule.Process.summary(index);
            };

        $scope.scheduleInstance = {
            date: null, time: null,
            Label: {start: ''},
            Load: function (i, I) {
                try {
                    index = i;
                    instance = I;
                    var data = instance.getData();
                    angular.forEach(data, function (value, key) {
                        if(this[key] !== undefined) {
                            this[key] = value;
                        }
                    }, $this);
                    this.Label.start = scheduleUtil.stringDateAsNiceDate(this.date);
                } catch(e) {
                    $log.warn('scheduleInstanceController::Load');
                    $log.error(e);
                }
            }
        };

        $this = $scope.scheduleInstance;

        $scope.$on('uiMinicalUpdate', function(e, data){
            switch(data.name){
                case 'date':
                    $this.date = data.value;
                    $this.Label.start = scheduleUtil.stringDateAsNiceDate($this.date);
	                update();
                break;
            };
        });

        $scope.$on('uiTimePickerUpdate', function(e, data){
            switch(data.name){
                case 'time':
                    $this.date = data.value;
                    $this.Label.start = scheduleUtil.stringDateAsNiceDate($this.date);
                    $this.time = scheduleUtil.fromIsoTime($this.date);
	                update();
                break;
            };
        });

    })
    .directive('uiScheduler', function ($timeout, $log, scheduleUtil, $cal) {
        return {
            scope: {
                dpcModel: '='
            },
            replace: true,
            templateUrl:  'views/schedule/index.htm',
            controller: function ($scope, $element, $attrs) {

                var STARTTIME = '00:00',
                    dateHandler = function (obj, node, type) {
						var date = {start: 'date'},
							time = {start: 'time'},
							dates = {
								start: function () { return obj.dates && obj.dates[0]; }
							}[type],
							datetime = {
								start: function () { var t = obj.dates && scheduleUtil.fromIsoTime(obj.dates[0]) || null; return t || STARTTIME; }
							}[type],
							times = {
								start: function () { return obj.time ? obj.time: datetime(); }
							}[type];

						if (!node) {
							node = dates();
						}

						if (node && obj[time[type]]) {
							node = scheduleUtil.fromIsoDate(node) + 'T' + obj[time[type]];
						}

						if (node.indexOf('T') < 0) {
							node += 'T' + times();
						}

						if (!obj[time[type]]) {
							obj[time[type]] = scheduleUtil.fromIsoTime(node);
						}

						obj[date[type]] = node;

						return obj;
                    };

                $scope.Schedule = {
                    summary: '', list: [],
                    days: $cal.getLmDaysShort(true),
                    Process: {
                        summary: function (index) {
                            $scope.Schedule.summary = $scope.Schedule.list[index] && $scope.Schedule.list[index].getSummary() || '';
                        },
                        model: function (model) {
                            $scope.Schedule.list.push(model.getOccurrence());
                        }
                    }
                };

                /**
                 *    Init Scheduler from model - input
                 */
                $scope.$watch(
                    function () { return $scope.dpcModel; },
                    function (model) {
                        if (model && !$scope.Schedule.model) {
                            $scope.Schedule.Process.model(model);
                            $scope.Schedule.Process.summary(0);
                        }
                    }
                );
            }
        };
    })
    .filter('stringDateAsNiceDate', function (scheduleUtil) {
        return scheduleUtil.stringDateAsNiceDate;
    })
    .filter('stringTimeAsNiceTime', function (scheduleUtil) {
        return scheduleUtil.stringTimeAsNiceTime;
    });
