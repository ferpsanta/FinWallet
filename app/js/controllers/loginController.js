finApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  });
}]);

finApp.controller('LoginController', [ '$scope', '$location', 'authService', 'alertService', '$uibModal',
  function( $scope, $location, authService, alertService, $uibModal) {

    var vm = this;

    vm.login = login;
    vm.register = register;

    $scope.alerts = alertService.getAlerts();

    (function InitController() {
      authService.ClearCredentials();
    })();

    function login() {
      authService.Login(vm.email, vm.password, function (response) {
        if (response.success) {
          console.log('Login successfully');
          alertService.addAlert( "success", "Login successfully!");
          authService.SetCredentials(vm.email, vm.password);
          $location.path('/');
        } else {
          console.log(response.message);
          alertService.addAlert( "error", response.message);
        }
      });
    }

    function register() {
      var registerModal = $uibModal.open({
                                      templateUrl: 'views/modals/register.html',
                                      controller: 'RegisterController',
                                      controllerAs: 'vm'
                                    });
      registerModal.result.then(function() {

      }, function () {
      });
    }


}]);