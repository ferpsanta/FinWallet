finApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  });
}]);

finApp.controller('LoginController', [ '$scope', '$location', 'authService', 'quotePortfolioService', 'alertService', '$uibModal',
  function( $scope, $location, authService, quotePortfolioService, alertService, $uibModal) {

    var vm = this;

    vm.login = login;
    vm.register = register;

    $scope.alerts = alertService.getAlerts();

    (function InitController() {
      alertService.addAlert("info", "Demo credentials - User: 'demo' & Password: 'demo'", 15000);
      authService.clearCredentials();
    })();

    function login() {
      authService.login(vm.email, vm.password, function (response) {
        if (response.success) {
          console.log('Login successfully');
          alertService.addAlert( "success", "Login successfully!");
          authService.setCredentials(vm.email, vm.password);
          quotePortfolioService.setQuotePortfolio(vm.email);
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