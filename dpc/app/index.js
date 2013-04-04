/**
 *    Application :: Init
 */
angular.module('dpc-app.providers', ['dndProvider', 'calProvider', 'scheduleProvider', 'pickerProvider', 'formsProvider']);

angular.module('dpc-app.directives', ['indexDirective']);

angular.module('dpc-app.controllers', ['indexController']);

angular.module('dpc-app', ['dpc-app.providers','dpc-app.directives','dpc-app.controllers']);