finApp.directive('navbar', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/navbar.html',
    controller: 'NavbarController',
    controllerAs: 'nbc'
  };
});