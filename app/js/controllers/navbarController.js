finApp.controller('NavbarController', ['$location', 'authService', 'alertService', 'quotePortfolioService',
  function($location, authService, alertService, quotePortfolioService) {
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
      quotePortfolioService.clearQuotePortfolio();
      $location.path('/login');
    };

    function dashboard() {
      $location.path('/dashboard');
    };

  }
]);