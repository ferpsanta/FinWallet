finApp.controller('NavbarController', ['$location', 'authService',
  function($location, authService) {
    var nbc = this;

    console.log('nbc loaded!');

    nbc.home = home;
    nbc.logout = logout;
    nbc.dashboard = dashboard;

    function home() {
      console.log('Home action performed!');
      $location.path('/');
    };

    function logout() {
      console.log('Logout action performed!');
      authService.ClearCredentials();
      $location.path('/login');
    };

    function dashboard() {
      console.log('Dashboard action performed!');
      $location.path('/dashboard');
    };

  }
]);