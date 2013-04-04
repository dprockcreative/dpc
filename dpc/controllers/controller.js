angular.module('indexController.controllers', [
    'rangeController', 
    'datetimeController'
]);


angular
    .module('indexController', ['indexController.controllers'])
    .controller('indexController', function($scope, $log){        
    })
;

angular
    .module('rangeController', [])
    .controller('rangeController', function($scope, $timeout, $log, dragui, utilities){        

        /**
         * Drag Bar
         */
        $scope.$on('rangeDragBarStretch', function(e, drag){
            switch (drag.event){
                case 'load':
                    $scope.Dragbar.dragger = drag;
                    $scope.Dragbar.end.value = 1;
                    dragui.ratioToPosition($scope.Dragbar.dragger, (1 - $scope.Dragbar.end.value), 'right');

                    $scope.Dragbar.start.label = $scope.Dragbar.start.value;
                    $scope.Dragbar.end.label   = $scope.Dragbar.end.value;
                break;
                case 'drag':
                    if (drag.isEnd){
                        $scope.Dragbar.end.value = $scope.Dragbar.dragger.params.right; 
                        $scope.Dragbar.end.label = Math.round($scope.Dragbar.end.value * 1000)/1000;
                    } else {
                        $scope.Dragbar.start.value = $scope.Dragbar.dragger.params.left; 
                        $scope.Dragbar.start.label = Math.round($scope.Dragbar.start.value * 1000)/1000;
                        if($scope.Dragbar.start.value >= $scope.Dragbar.end.value){
                            $scope.Dragbar.end.value = $scope.Dragbar.start.value + 0.001;
                            dragui.ratioToPosition($scope.Dragbar.dragger, (1 - $scope.Dragbar.end.value), 'right');
                            $scope.Dragbar.end.label = utilities.constrain((Math.round($scope.Dragbar.end.value * 1000)/1000), 0, 1);
                        }
                    }
                break;
            };
        });
    })
;

angular
    .module('datetimeController', [])
    .controller('datetimeController', function($scope, $timeout, $log, $cal, scheduleUtil){        

        $scope.schedule = new function(){
            var $this = this;
            this.data = {date: '', time: ''};
            this.getData = function(){
                var data = $this.data;
                return {date: data.date, time: data.time};
            };
            this.getOccurrence = function() {
                this.getData = $this.getData;
                this.getSummary = function(){
                    return [scheduleUtil.stringDateAsNiceDate($this.data.date), scheduleUtil.stringTimeAsNiceTime($this.data.time)].join(" :: ");
                };
                return this;
            };
            this.update = function(data) {
                angular.forEach(data, function(value, key){
                    this[key] = value;
                }, $this.data);
            };
            var date = $cal.cloneDate(), 
                dateStr = scheduleUtil.toLocaleISOString(date);

            this.update({
                date: dateStr, 
                time: scheduleUtil.fromIsoTime(dateStr)
            });

            //$log.log(this.getData());
            return this;
        };
    })
;