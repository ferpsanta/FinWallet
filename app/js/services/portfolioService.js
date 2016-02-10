finApp.factory('portfolioService', [ 'yqlService',
  function (yqlService) {

    var service = {};
    portfolio = [];

    service.getPortfolio = getPortfolio;
    service.setPortfolio = setPortfolio;
    service.updatePortfolio = updatePortfolio;
    service.addQuote = addQuote;
    service.removeQuoteIndex = removeQuoteIndex;
    service.removeQuote = removeQuote;
    service.clearPortfolio = clearPortfolio;
    service.getByEmail = getByEmail;

    return service;

    function setPortfolio(email) {
      portfolio = getByEmail(email);

      if( portfolio.length > 0) {
        //Portfolio first update
        updatePortfolio();
      }
    }

    function getPortfolio (){
      return portfolio;
    }

    function updatePortfolio(){
      var symbolSet = [];
      var userQuote;
      var quote;

      angular.forEach( portfolio, function (quote){
        symbolSet.push(quote.symbol);
      });

      var promise = yqlService.getSetCurrentValue(symbolSet);
      promise.then(function(data){

        for (var i = 0; i < data.length; i++) {
          userQuote = portfolio[i];
          quote = data[i];

          userQuote.companyName = quote.Name;
          userQuote.lastPrice = quote.LastTradePriceOnly;
          userQuote.sessionChange = quote.Change;
          userQuote.balance = (userQuote.lastPrice-userQuote.buyOut)*userQuote.shares;
        }
      });
    }

    function addQuote (symbol, date, buyOut, commission, shares){
      portfolio.push({  symbol: symbol,
                        companyName: '',
                        buyDate: date,
                        buyOut: buyOut,
                        lastPrice: '',
                        shares: shares,
                        commission: commission,
                        balance: ''
                      });
    }

    function removeQuoteIndex (quoteIndex){
      return portfolio.splice(quoteIndex, 1);
    }

    function removeQuote (quote){
      return removeQuoteIndex(portfolio.indexOf(quote));
    }

    function clearPortfolio (){
      portfolio = [];
    }

    function getByEmail(email){
      //Demo values... Not Restfull, in future this must be queried to a DB...
      if (email == 'demo') {
        var portfolio = [{
          symbol: 'GOOGL',
          companyName: '',
          buyDate: '2015-02-25',
          buyOut: '632.10',
          lastPrice: '',
          shares: '123',
          balance: ''
        },
          {
            symbol: 'YHOO',
            companyName: '',
            buyDate: '2015-02-25',
            buyOut: '22.23',
            lastPrice: '',
            sessionChange: '',
            shares: '100',
            balance: ''
          },
          {
            symbol: 'MSFT',
            companyName: '',
            buyDate: '2015-02-25',
            buyOut: '55.00',
            lastPrice: '',
            sessionChange: '',
            shares: '52',
            balance: ''
          },
          {
            symbol: 'AAPL',
            companyName: '',
            buyDate: '2015-02-25',
            buyOut: '78.98',
            lastPrice: '',
            sessionChange: '',
            shares: '34',
            balance: ''
          }];
      } else {
        var portfolio = [];
      }

      return portfolio;
    }

  }
]);