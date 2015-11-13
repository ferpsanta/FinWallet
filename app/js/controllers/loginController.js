finApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  });
}]);

finApp.controller('LoginController', [ '$location', 'authService', '$uibModal',
  function( $location, authService, $uibModal) {
    console.log('Using LoginController');
    var vm = this;

    vm.login = login;
    vm.register = register;

    (function InitController() {
      // reset login status
      authService.ClearCredentials();
    })();

    function login() {
      vm.loading = true;
      console.log('Trying to login...');
      authService.Login(vm.username, vm.password, function (response) {
        if (response.success) {
          authService.SetCredentials(vm.username, vm.password);
          $location.path('/');
        } else {
          vm.loading = false;
        }
      });
    };

    function register() {
      console.log('Opening register modal');
      var registerModal = $uibModal.open({
                                      templateUrl: 'views/modals/register.html',
                                      controller: 'RegisterController',
                                      controllerAs: 'vm'
                                    });
      registerModal.result.then(function() {

      }, function () {
        console.log('Register modal dismissed');
      });
    };


}]);