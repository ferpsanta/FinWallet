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

    console.log('Home controller active!');

  }
]);