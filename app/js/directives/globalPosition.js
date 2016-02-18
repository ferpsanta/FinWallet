finApp.directive('globalpositionpanel', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/globalPositionPanel.html',
    controller: 'GlobalPositionController',
    controllerAs: 'gpc'
  };
});