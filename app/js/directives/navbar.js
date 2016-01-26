finApp.directive('navbar', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/navbar.html',
    controller: 'NavbarController',
    controllerAs: 'nbc'
  };
});