finApp.directive('brief', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/brief.html',
    controller: 'BriefController',
    controllerAs: 'bfc'
  };
});