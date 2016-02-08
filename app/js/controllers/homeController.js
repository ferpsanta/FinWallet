finApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  });
}]);

finApp.controller('HomeController', ['$scope', '$location', 'authService', 'alertService',
  function( $scope, $location, authService, alertService) {
    var vm = this;

    $scope.alerts = alertService.getAlerts();

  }
]);