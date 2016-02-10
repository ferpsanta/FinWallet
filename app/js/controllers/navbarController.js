finApp.controller('NavbarController', ['$location', 'authService', 'alertService', 'portfolioService',
  function($location, authService, alertService, portfolioService) {
    var nbc = this;

    nbc.home = home;
    nbc.logout = logout;
    nbc.dashboard = dashboard;

    function home() {
      $location.path('/');
    };

    function logout() {
      alertService.addAlert("success", "User log out!");
      authService.clearCredentials();
      portfolioService.clearPortfolio();
      $location.path('/login');
    };

    function dashboard() {
      $location.path('/dashboard');
    };

  }
]);