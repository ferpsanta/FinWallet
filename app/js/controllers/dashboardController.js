finApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  });
}]);

finApp.controller('DashboardController', ['$location', 'authService',
  function( $location, authService) {
    var vm = this;
    console.log('Dashboard controller ON');
  }
]);