finApp.controller('BriefController', ['$scope', '$interval', '$rootScope', 'portfolioService',
  function($scope, $interval, $rootScope, portfolioService) {
    var bfc = this;

    bfc.addQuote = addQuote;

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

    function addQuote() {
      console.log("New Quote Added");
      portfolioService.addQuote(bfc.quote.symbol, bfc.quote.companyName, bfc.quote.buyDate,
                                bfc.quote.buyPrice, bfc.quote.commission, bfc.quote.shares);
      $scope.usrPortfolio = portfolioService.getPortfolio();
    }
  }
]);