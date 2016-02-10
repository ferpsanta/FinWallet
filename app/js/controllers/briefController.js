finApp.controller('BriefController', ['$scope', '$interval', 'portfolioService',
  function($scope, $interval, portfolioService) {
    var bfc = this;

    $scope.usrPortfolio = portfolioService.getPortfolio();
    $interval(function(){
      if (portfolioService.getPortfolio().length > 0) {
        portfolioService.updatePortfolio()
      }
    }, 5000);

  }
]);