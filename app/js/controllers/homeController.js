finApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'vm'
  });
}]);




finApp.controller('HomeController', ['$location', 'authService',
  function( $location, authService) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      console.log('Logout action performed!');
      authService.ClearCredentials();
      $location.path('/login');
    };


  }
]);