finApp.factory('balanceService', [ 'quotePortfolioService',
  function (quotePortfolioService) {

    var service = {};
    var products = [{
      name: 'Variable Return Overall Balance',
      shortName: 'Var. Ret.',
      overallReturn: '',
      gain: '',
      marketValue: '',
      valuableInfo: {
        signBalance: ''
      }
    },
      {
        name: 'Fixed Return Overall Balance',
        shortName: 'Fix. Ret.',
        overallReturn: '',
        gain: '',
        marketValue: '',
        valuableInfo: {
          signBalance: ''
        }
      },
      {
        name: 'Funds Overall Balance',
        shortName: 'Funds',
        overallReturn: '',
        gain: '',
        marketValue: '',
        valuableInfo: {
          signBalance: ''
        }
      }];

    service.getProducts = getProducts;
    service.updateProductsBalance = updateProductsBalance;

    return service;

    function getProducts (){
      return products;
    }

    function updateProductsBalance(){
      products[0] = calcVarReturnBalance();

    }

    function calcVarReturnBalance () {
      var quotes = quotePortfolioService.getQuotePortfolio();

      if (quotes.length > 0) {
        var startingCapital = 0.0;
        var finalCapital = 0.0;
        angular.forEach(quotes, function (quote) {
          var quoteStartingCapital = (parseFloat(quote.buyOut)*parseInt(quote.shares)) + parseFloat(quote.commission);
          var quoteFinalCapital = quoteStartingCapital+parseFloat(quote.balance);
          startingCapital += quoteStartingCapital;
          finalCapital += quoteFinalCapital;
        });

        return balanceUtils.evaluateValuableInfo({
                name: 'Variable Return Overall Balance',
                shortName: 'Var. Ret.',
                overallReturn: ((100/startingCapital)*finalCapital)-100,
                gain: finalCapital-startingCapital,
                marketValue: finalCapital,
                valuableInfo: {
                  signBalance: ''
                }
              });
      }
    }

    function calcFixReturnBalance () {
      return null; //TODO
    }

    function calcFundsReturnBalance () {
      return null; //TODO
    }
  }
]);

var balanceUtils = {
  evaluateValuableInfo: function (product) {

    if (product.gain > 0) {
      product.valuableInfo.signBalance = 'positive';
    } else if (product.gain < 0) {
      product.valuableInfo.signBalance = 'negative';
    } else {
      product.valuableInfo.signBalance = 'neutral';
    }
    return product;
  },

  mustBeUpdated: function (quote) {

  }
};