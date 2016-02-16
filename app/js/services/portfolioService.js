finApp.factory('portfolioService', [ 'yqlService', 'googleFinanceService',
  function (yqlService, googleFinanceService) {

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
        updatePortfolio();// Portfolio first update
      }
    }

    function getPortfolio (){
      return portfolio;
    }

    function updatePortfolio(){
      var symbolSet = [];
      var userQuote;
      var quote;

      angular.forEach( portfolio, function (quote) {
        symbolSet.push(quote.ticker+":"+quote.exchange);
      });

      var promise = googleFinanceService.getSetCurrentValue(symbolSet);

      promise.then(function(data){

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < portfolio.length; j++) {

            userQuote = portfolio[j];
            quote = data[i];

            if(quote.t === userQuote.ticker && quote.e === userQuote.exchange){

              userQuote.transactionID = i;
              userQuote.lastPrice = quote.l;
              userQuote.openPrice = quote.pcls_fix;
              userQuote.sessionChange = quote.c;
              userQuote.balance = (userQuote.lastPrice - userQuote.buyOut) * userQuote.shares - userQuote.commission;
              userQuote = utils.evaluateValuableInfo(userQuote);

            }
          }
        }
      });
    }

    function addQuote (symbol, companyName, date, buyOut, commission, shares){
      var symbolSplit = symbol.split(":");
      portfolio.push({  transactionID: portfolio.length,
                        ticker: symbolSplit[0],
                        exchange: symbolSplit[1],
                        companyName: companyName,
                        buyDate: date,
                        buyOut: buyOut,
                        openPrice: '',
                        lastPrice: '',
                        lastPriceData: '',
                        shares: shares,
                        commission: commission,
                        balance: '',
                        valuableInfo:{
                          signChange:'',
                          signBalance:'',
                          lastPriceData: ''
                        }
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
          ticker: 'GOOGL',
          exchange: 'NASDAQ',
          companyName: 'Alphabet Inc.',
          buyDate: '2015-02-25',
          buyOut: '632.10',
          openPrice: '',
          lastPrice: '',
          shares: '123',
          commission: '100',
          balance: '',
          valuableInfo:{
            signChange:'',
            signBalance:'',
            lastPriceData: ''
          }
        },
          {
            ticker: 'IDR',
            exchange: 'BME',
            companyName: 'Indra Company S.A.',
            buyDate: '2015-02-25',
            buyOut: '8.03',
            openPrice: '',
            lastPrice: '',
            lastPriceData: '',
            sessionChange: '',
            shares: '472',
            commission: '28.00',
            balance: '',
            valuableInfo: {
              signChange: '',
              signBalance: '',
              lastPriceData: ''
            }
          },
          {
            ticker: 'ITX',
            exchange: 'BME',
            companyName: 'Inditex',
            buyDate: '2015-02-25',
            buyOut: '28.54',
            openPrice: '',
            lastPrice: '',
            lastPriceData: '',
            sessionChange: '',
            shares: '108',
            commission: '9.50',
            balance: '',
            valuableInfo:{
              signChange:'',
              signBalance:'',
              lastPriceData: ''
            }
          },
          {
            ticker: 'AAPL',
            exchange: 'NASDAQ',
            companyName: 'Apple Inc.',
            buyDate: '2015-02-25',
            buyOut: '78.98',
            openPrice: '',
            lastPrice: '',
            lastPriceData: '',
            sessionChange: '',
            shares: '34',
            commission: '50.00',
            balance: '',
            valuableInfo:{
              signChange:'',
              signBalance:'',
              lastPriceData: ''
            }
          }];
      } else {
        var portfolio = [];
      }
      return portfolio;
    }

  }
]);


var utils = {
  evaluateValuableInfo: function (quote) {

    if (quote.balance > 0) {
      quote.valuableInfo.signBalance = 'positive';
    } else if (quote.balance < 0) {
      quote.valuableInfo.signBalance = 'negative';
    } else {
      quote.valuableInfo.signBalance = 'neutral';
    }
    if (quote.sessionChange > 0) {
      quote.valuableInfo.signChange = 'positive';
    } else if (quote.sessionChange < 0) {
      quote.valuableInfo.signChange = 'negative';
    } else {
      quote.valuableInfo.signChange = 'neutral';
    }
    return quote;
  },

  mustBeUpdated: function (quote) {

  }
};