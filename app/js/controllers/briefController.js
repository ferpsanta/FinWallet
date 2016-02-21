finApp.controller('BriefController', ['$scope', '$interval', '$rootScope', 'quotePortfolioService',
  function($scope, $interval, $rootScope, quotePortfolioService) {
    var bfc = this;

    var master = {};

    bfc.addQuote = addQuote;
    bfc.removeQuote = quotePortfolioService.removeQuote;
    bfc.showQuoteDetails = showQuoteDetails;
    bfc.resetQuoteForm = resetQuoteForm;

    (function InitController() {
      quotePortfolioService.setQuotePortfolio($rootScope.globals.currentUser.username);
      $scope.usrPortfolio = quotePortfolioService.getQuotePortfolio();
    })();

    stopUpdater = $interval(function(){
                    if (quotePortfolioService.getQuotePortfolio().length > 0) {
                      quotePortfolioService.updateQuotePortfolio();
                    }
                  }, 5000);

    $scope.$on('$destroy', function() {
      $interval.cancel(stopUpdater);
    });

    function addQuote() {
      quotePortfolioService.addQuote(bfc.quote.symbol, bfc.quote.companyName, bfc.quote.buyDate,
                                bfc.quote.buyPrice, bfc.quote.commission, bfc.quote.shares);
      $scope.usrPortfolio = quotePortfolioService.getQuotePortfolio();
    }

    function showQuoteDetails(quote) {

    }

    function resetQuoteForm (form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      bfc.quote = angular.copy(master);
    }
  }
]);