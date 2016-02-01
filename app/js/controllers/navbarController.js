finApp.controller('NavbarController', ['$location', 'authService', 'alertService',
  function($location, authService, alertService) {
    var nbc = this;

    console.log('nbc loaded!');

    nbc.home = home;
    nbc.logout = logout;
    nbc.dashboard = dashboard;

    function home() {
      $location.path('/');
    };

    function logout() {
      alertService.addAlert("success", "User log out!");
      authService.ClearCredentials();
      $location.path('/login');
    };

    function dashboard() {
      $location.path('/dashboard');
    };

  }
]);