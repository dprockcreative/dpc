/**
 * Forms
 */
angular
    .module('formsProvider', [])
    .factory('forms', function () {
        function Form(id, onchange) {
            this.id = id || '';
            this.source = [];
            this.onchange = onchange;
            this.checkbox = {
                checked: false, labels: {checked: 'On', unchecked: 'Off' }
            };
            this.radio = {
                selected: null,
                options: [],
                get: function () { return this.selected; },
                set: function (selected) { this.selected = selected; },
                is : function (index) { return (this.get() === index); }
            };
            return this;
        }
        return Form;
    })
    .directive('uiFormsRadio', function ($timeout, $log, forms) {
        return {
            replace: true,
            scope: {'dpcFormModel': '=', 'dpcFormSource': '=', 'dpcDisabled': '='},
            templateUrl: 'views/forms/radio.htm',
            controller: function ($scope, $element, $attrs) {
                $timeout(function () {
                    try {

                        var type = 'string';

                        $scope.Forms = new forms($scope.$id);
                        $scope.$watch(
                            function () { return $scope.dpcFormSource; },
                            function (source) {
                                if (!$scope.Forms.radio.options.length) {
                                    type = typeof source[0];
                                    $scope.Forms.radio.options = source;
                                }
                            },
                        true);

                        $scope.$watch(
                            function () { return $scope.Forms.radio.selected; },
                            function (selected) {
                                if (angular.isNumber(selected)) {
                                    $scope.dpcFormModel = (type === 'object') ? $scope.dpcFormSource[selected].value:$scope.dpcFormSource[selected];
                                }
                            },
                        true);

                    } catch(e) {
                        $log.warn('formsProvider::uiFormsRadio');
                        $log.error(e);
                    }
                });
            }
        };
    })
    .directive('uiFormsCheckbox', function ($timeout, $parse, $log, forms) {
        return {
            replace: true,
            scope: {'dpcFormModel': '=', 'dpcDisabled': '='},
            templateUrl: 'views/forms/checkbox.htm',
            controller: function ($scope, $element, $attrs) {
                var onChange = $attrs.dpcFormChange && $parse($attrs.dpcFormChange);
                
                $scope.Forms = new forms($scope.id,
                                         function() { 
                                             $scope.dpcFormModel = $scope.Forms.checkbox.checked;
                                             $timeout(function(){
                                                 onChange && onChange($scope.$parent);
                                             });
                                         });
                $scope.Forms.checkbox.checked = $scope.dpcFormModel || false;

                if ($attrs.gbLabelChecked) {
                    $scope.Forms.checkbox.labels.checked = $attrs.gbLabelChecked;
                }

                if ($attrs.gbLabelUnchecked) {
                    $scope.Forms.checkbox.labels.unchecked = $attrs.gbLabelUnchecked;
                }

                $scope.$watch(
                    function () { return $scope.dpcFormModel; },
                    function (dpcFormModel) {
                        $scope.Forms.checkbox.checked = dpcFormModel; },
                    true);
            }
        };
    })
;