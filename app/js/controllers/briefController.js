finApp.controller('BriefController', ['$scope', '$interval', '$rootScope', 'userService', 'portfolioService',
  function($scope, $interval, $rootScope, userService, portfolioService) {
    var bfc = this;

    (function InitController() {
      portfolioService.setPortfolio($rootScope.globals.currentUser.username);
    })();

    $scope.usrPortfolio = portfolioService.getPortfolio();
    stopUpdater = $interval(function(){
                if (portfolioService.getPortfolio().length > 0) {
                  portfolioService.updatePortfolio();
                }
              }, 5000);

    $scope.$on('$destroy', function() {
      $interval.cancel(stopUpdater);
    });

  }
]);