angular
    .module('dndProvider', [])
    .factory('dragui', function($timeout, $parse, $interpolate, $log, utilities){

        var $doc = angular.element(document),
            ie = window.ie,
            fixE = function(e){
                if (e.pageX == null && e.clientX != null){
                    var e = document.documentElement, b = document.body;e.pageX = e.clientX + (e && e.scrollLeft || b.scrollLeft || 0);
                    e.pageY = e.clientY + (e && e.scrollTop || b.scrollTop || 0);
                }
                return e;
            },
            styleFactor = function(obj, factor){
                angular.forEach(obj, function(value, key){
                    if (angular.isNumber(value)){ this[key] = String(value + factor); }
                }, obj);
                return obj;
            };

        this.$doc = $doc;
        this.fixE = fixE;
        this.styleFactor = styleFactor;

        this.ratioToPosition = function(dragger, ratio, param){
            if (dragger){
                dragger.params[param] = ratio;
                var css = {};css[param] = (ratio * 100);
                angular.extend(dragger.css, styleFactor(css, '%'));
            }
        };

        function Container($scope, $attrs){
            var id = angular.isUndefined($attrs.uiDragContainer) ? null: $interpolate($attrs.uiDragContainer)($scope),
                container = id ? angular.element(document.querySelector(id)): angular.element(document.querySelector('body'));
            this.name     = id ? id.substr(1) : 'container_' + $scope.$id;
            this.params   = {top: null, left: null, right: null, bottom: null, width: null, height: null};
            this.update   = function(params){angular.forEach(params, function(value, key){this[key] = value;}, this.params);};
            this.oUpdate  = function(){ var obj = container[0];this.update({width: obj.offsetWidth, height: obj.offsetHeight, top: obj.offsetTop, right: obj.offsetLeft + obj.offsetWidth, bottom: obj.offsetTop + obj.offsetHeight, left: obj.offsetLeft}); };
            return this;
        }

        this.Draggable = function($scope, $element, $attrs){
            var $this    = this;
            this.container = new Container($scope, $attrs);

            this.name    = angular.isUndefined($attrs.uiDraggable) ? 'draggable_' + $scope.$id: $interpolate($attrs.uiDraggable)($scope);
            this.axis    = angular.isUndefined($attrs.uiDragAxis) ? 'xy': (['xy','x','y'].indexOf($attrs.uiDragAxis) > -1) ? $attrs.uiDragAxis: 'xy';
            this.params  = {top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, deltaX: 0, deltaY: 0};
            this.css     = {};
            this.moving  = false;
            this.event   = 'load';
            this.update  = function(params){angular.forEach(params, function(value, key){ this[key] = value; }, $this.params);};
            this.markers = {X: 0, Y: 0, _x: 0, _y: 0,
                get: function(){ return {X: this.X, Y: this.Y, _x: this._x, _y: this._y}; },
                set: function(markers){ angular.extend(this, markers); }
            };

            this.init = function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                $this.event = 'init';
                $this.markers.set({
                    X: e.pageX, Y: e.pageY, _x: (e.pageX - $element[0].offsetLeft), _y: (e.pageY - $element[0].offsetTop)
                });

                $this.moving = true;
                $doc.bind('mousemove touchmove', $this.drag);
                $doc.bind('mouseup touchend', $this.end);
                $scope.$emit($this.name, $this);
                $this.event = 'drag';
            };

            this.drag = null;

            this.end = function(e){
                $this.event = 'end';
                if($this.moving){
					$doc.unbind('mousemove touchmove', $this.drag);
					$doc.unbind('mouseup touchend', $this.end);
					$this.moving = false;
				}
                $scope.$emit($this.name, $this);
            };

            /**
             * Styles
             */
            var styles = {position:'absolute', cursor:'move'};
            angular.forEach(styles, function(value, style){
                $element.css(style, value);
            });

            $timeout(function(){
                $this.container.oUpdate();
            }, 100);

            angular.element(window).bind('resize', function(){
                $this.container.oUpdate();
                $this.event = 'resize';
                $scope.$emit($this.name, $this);
            });

            $timeout(function(){
                $scope.$emit($this.name, $this);
            }, 500);

            return this;
        };

        return this;
    })
    .directive('uiDragBar', function($timeout, $parse, $log, dragui){
        return {
            transclude: true,
            templateUrl: 'views/drag/bar.htm',
            controller: function($scope, $element, $attrs){
                $scope.Dragbar = {
                    dragger: null,
                    name: $attrs.uiDragBar || 'dragbar_' + $scope.$id,
                    start: {label: '', value: 0, item: angular.isUndefined($attrs.start) ? false: (typeof $parse($attrs.start)($scope) === 'boolean' ? $parse($attrs.start)($scope): false)},
                    end: {label: '', value: 0, item: angular.isUndefined($attrs.end) ? false: (typeof $parse($attrs.end)($scope) === 'boolean' ? $parse($attrs.end)($scope): false)}
                };
            }
        };
    })
    .directive('uiDraggable', function($timeout, $parse, $log, dragui, utilities){
        return {
            scope: true,
            controller: function($scope, $element, $attrs){

                $scope.Draggable = new dragui.Draggable($scope, $element, $attrs);
                var $this = $scope.Draggable;

                /**
                 * Each Drag type must extend a drag definition for itself
                 */
                angular.extend($scope.Draggable, {
                    buffer: angular.isUndefined($attrs.buffer) ? ($element[0].offsetWidth/2): (angular.isNumber($parse($attrs.buffer)($scope)) ? $parse($attrs.buffer)($scope): 0),
                    drag: function(e, suppress){

                        if (window.ie){ e = dragui.fixE(e); }
                        var update = {},
                            css = {
                                xy: function(){
                                    var deltaY = e.pageY - $this.markers.Y, deltaX = e.pageX - $this.markers.X;
                                    $this.params.top = utilities.constrain(((e.pageY - $this.markers._y + $this.buffer)/$this.container.params.height), 0, 1);
                                    $this.params.left = utilities.constrain(((e.pageX - $this.markers._x + $this.buffer)/$this.container.params.width), 0, 1);
                                    update = {deltaY: deltaY, deltaX: deltaX};
                                    return {top: ($this.params.top * 100), left: ($this.params.left * 100)};
                                },
                                x: function(){
                                    var deltaX = e.pageX - $this.markers.X;
                                    $this.params.left = utilities.constrain(((e.pageX - $this.markers._x + $this.buffer)/$this.container.params.width), 0, 1);
                                    update = {deltaX: deltaX};
                                    return {left: ($this.params.left * 100)};
                                },
                                y: function(){
                                    var deltaY = e.pageY - $this.markers.Y;
                                    $this.params.top = utilities.constrain(((e.pageY - $this.markers._y + $this.buffer)/$this.container.params.height), 0, 1);
                                    update = {deltaY: deltaY};
                                    return {top: ($this.params.top * 100)};
                                }
                            }[$this.axis]();

                        $timeout(function(){
                            $this.update(update);
                            angular.extend($this.css, dragui.styleFactor(css, '%'));
                        });

                        if (!suppress){ $scope.$emit($this.name, $this); }
                    }
                });

                $element
                    .prop('draggable', true)
                    .data('dragger', $scope.Draggable)
                    .bind('mousedown touchstart', $scope.Draggable.init);
            }
        };
    })
    .directive('uiDragStretch', function($timeout, $interpolate, $parse, $log, dragui, utilities){

        return {
            scope: true,
            controller: function($scope, $element, $attrs){

                $scope.Draggable = new dragui.Draggable($scope, $element, $attrs);
                var $this = $scope.Draggable;

                angular.extend($scope.Draggable, {
                    name: angular.isUndefined($attrs.uiDragStretch) ? 'stretcher_' + $scope.$id: $interpolate($attrs.uiDragStretch)($scope),
                    isEnd: false,
                    stretchInit: function(e, end){
                        $this.init(e);
                        $this.isEnd = end;
                        $this.markers.set({
                            _x: ($this.isEnd ? ($this.markers.X - ($element[0].offsetLeft + $element[0].offsetWidth)): $this.markers.X - $element[0].offsetLeft),
                            _y: ($this.isEnd ? ($this.markers.Y - ($element[0].offsetTop + $element[0].offsetHeight)): $this.markers.Y - $element[0].offsetTop)
                        });
                    },

                    /**
                     * Each Drag type must extend a drag definition for itself
                     */
                    drag: function(e, suppress){
                        if (window.ie){ e = dragui.fixE(e); }

                        var update = {},
                            css = {
                                xy: function(){
                                    update = {deltaY: (e.pageY - $this.markers.Y), deltaX: (e.pageX - $this.markers.X)};
                                    return {
                                        false: function(){
                                            $this.params.top = utilities.constrain(((e.pageY - $this.markers._y)/$this.container.params.height), 0, 1);
                                            $this.params.left = utilities.constrain(((e.pageX - $this.markers._x)/$this.container.params.width), 0, 1);
                                            return {top: ($this.params.top * 100), left: ($this.params.left * 100)};
                                        },
                                        true: function(){
                                            $this.params.right = utilities.constrain(((e.pageX - $this.markers._x)/$this.container.params.width), $this.params.left, 1);
                                            $this.params.bottom = utilities.constrain(((e.pageY - $this.markers._y)/$this.container.params.height), $this.params.top, 1);
                                            return {right: ((1 - $this.params.right) * 100), bottom: ((1 - $this.params.bottom) * 100)};
                                        }
                                    }[$this.isEnd]();
                                },
                                x: function(){
                                    update = {deltaX: (e.pageX - $this.markers.X)};
                                    return {
                                        false: function(){
                                            $this.params.left = utilities.constrain(((e.pageX - $this.markers._x)/$this.container.params.width), 0, 1);
                                            return {left: ($this.params.left * 100)};
                                        },
                                        true: function(){
                                            $this.params.right = utilities.constrain(((e.pageX - $this.markers._x)/$this.container.params.width), $this.params.left, 1);
                                            return {right: ((1 - $this.params.right) * 100)};
                                        }
                                    }[$this.isEnd]();
                                },
                                y: function(){
                                    update = {deltaY: (e.pageY - $this.markers.Y)};
                                    return {
                                        false: function(){
                                            $this.params.top = utilities.constrain(((e.pageY - $this.markers._y)/$this.container.params.height), 0, 1);
                                            return {top: ($this.params.top * 100)};
                                        },
                                        true: function(){
                                            $this.params.bottom = utilities.constrain(((e.pageY - $this.markers._y)/$this.container.params.height), $this.params.top, 1);
                                            return {bottom: ((1 - $this.params.bottom) * 100)};
                                        }
                                    }[$this.isEnd]();
                                }
                            }[$this.axis]();

                        $timeout(function(){
                            $this.update(update);
                            angular.extend($this.css, dragui.styleFactor(css, '%'));
                        });

                        if (!suppress){
                            $scope.$emit($this.name, $this);
                        }
                    }
                });
            }
        };
    })
    .directive('uiDragHandle', function($log){
        return {
            scope: true,
            controller: function($scope, $element, $attrs){
                $element
                    .prop('draggable', true)
                    .data('dragger', $scope.$parent.Draggable)
                    .bind('mousedown touchstart', function(e){
                        $scope.$parent.Draggable.stretchInit(e, ($attrs.uiDragHandle === 'end'));
                    });
            }
        };
    })
    .directive('uiDragCenter', function($timeout, $interpolate, $parse, $log, dragui){
        return {
            scope: true,
            controller: function($scope, $element, $attrs){

                $scope.Draggable = new dragui.Draggable($scope, $element, $attrs);
                var $this = $scope.Draggable;

                /**
                 * Each Drag type must extend a drag definition for itself
                 */
                angular.extend($scope.Draggable, {
                    element: $element,
                    name: angular.isUndefined($attrs.uiDragCenter) ? 'dragcenter_' + $scope.$id: $interpolate($attrs.uiDragCenter)($scope),
                    recenter: angular.isUndefined($attrs.recenter) ? false:(typeof $parse($attrs.recenter)($scope) === 'boolean' ? $parse($attrs.recenter)($scope):false),
                    centerInit: function(e){
                        $this.init(e);
                        $timeout(function(){
                            $this.markers.set({_x: $element[0].offsetLeft, _y: $element[0].offsetTop});
                        });
                    },
                    drag: function(e, suppress){
                        if (window.ie){ e = dragui.fixE(e); }
                        if ($this.moving){
                            var update = {},
                                css = {
                                    xy: function(){
                                        var deltaY = e.pageY - $this.markers.Y, deltaX = e.pageX - $this.markers.X;
                                        $this.params.left = (($this.markers._x + deltaX)/$this.container.params.width);
                                        $this.params.top = (($this.markers._y + deltaY)/$this.container.params.height);
                                        update = {deltaY: deltaY, deltaX: deltaX};
                                        return {left: ($this.params.left * 100), top: ($this.params.top * 100)};
                                    },
                                    x: function(){
                                        var deltaX = e.pageX - $this.markers.X;
                                        $this.params.left = (($this.markers._x + deltaX)/$this.container.params.width);
                                        update = {deltaX: deltaX};
                                        return {left: ($this.params.left * 100)};
                                    },
                                    y: function(){
                                        var deltaY = e.pageY - $this.markers.Y;
                                        $this.params.top = (($this.markers._y + deltaY)/$this.container.params.height);
                                        update = {deltaY: deltaY};
                                        return {top: ($this.params.top * 100)};
                                    }
                                }[$this.axis]();

                            $timeout(function(){
                                $this.update(update);
                                angular.extend($this.css, dragui.styleFactor(css, '%'));
                            });
                        }
                        if (!suppress){ $scope.$emit($this.name, $this); }
                    },
                    end: function(e){
						$this.event = 'end';
						if($this.moving){
							$this.moving = false;
                            dragui.$doc.unbind('mousemove touchmove', $this.drag);
                            dragui.$doc.unbind('mouseup touchend', $this.end);
						}
                        $timeout(function(){
                            if ($this.recenter){
                                $this.css = {};
                                $element.css({left: null, top: null});
                                $this.markers.set({_x: $element[0].offsetLeft, _y: $element[0].offsetTop});
                            }
                            $scope.$emit($this.name, $this);
                        });
                    }
                });

                $element
                    .prop('draggable', true)
                    .data('dragger', $scope.Draggable)
                    .bind('mousedown touchstart', function(e){
                        $scope.Draggable.centerInit(e);
                    });
            }
        };
    })
;