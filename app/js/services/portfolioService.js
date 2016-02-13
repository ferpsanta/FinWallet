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

      angular.forEach( portfolio, function (quote){
        symbolSet.push(quote.symbol);
      });

      var promise = googleFinanceService.getSetCurrentValue(symbolSet);

      promise.then(function(data){
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < portfolio.length; j++) {
            var dataSymbol = data[i].e+":"+data[i].t;
            if(dataSymbol === portfolio[j].symbol){
              userQuote = portfolio[j];
              quote = data[i];


              userQuote.lastPrice = quote.l;
              userQuote.sessionChange = quote.c;
              userQuote.balance = (userQuote.lastPrice - userQuote.buyOut) * userQuote.shares;

              if (userQuote.balance > 0) {
                userQuote.valuableInfo.signBalance = 'positive';
              } else if (userQuote.balance < 0) {
                userQuote.valuableInfo.signBalance = 'negative';
              } else {
                userQuote.valuableInfo.signBalance = 'neutral';
              }
              if (userQuote.sessionChange > 0) {
                userQuote.valuableInfo.signChange = 'positive';
              } else if (userQuote.sessionChange < 0) {
                userQuote.valuableInfo.signChange = 'negative';
              } else {
                userQuote.valuableInfo.signChange = 'neutral';
              }
            }
          }
        }
      });
    }

    function addQuote (symbol, companyName, date, buyOut, commission, shares){
      portfolio.push({  symbol: symbol,
                        companyName: companyName,
                        buyDate: date,
                        buyOut: buyOut,
                        lastPrice: '',
                        shares: shares,
                        commission: commission,
                        balance: '',
                        valuableInfo: { signChange:'',
                                        signBalance:''
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
          symbol: 'NASDAQ:GOOGL',
          companyName: 'Alphabet Inc.',
          buyDate: '2015-02-25',
          buyOut: '632.10',
          lastPrice: '',
          shares: '123',
          balance: '',
          valuableInfo: { signChange:'',
                          signBalance:''
          }
        },
          {
            symbol: 'BME:IDR',
            companyName: 'Indra Company S.A.',
            buyDate: '2015-02-25',
            buyOut: '8.03',
            lastPrice: '',
            sessionChange: '',
            shares: '100',
            balance: '',
            valuableInfo: { signChange:'',
                            signBalance:''
            }
          },
          {
            symbol: 'BME:ITX',
            companyName: 'Inditex',
            buyDate: '2015-02-25',
            buyOut: '28.54',
            lastPrice: '',
            sessionChange: '',
            shares: '52',
            balance: '',
            valuableInfo: { signChange:'',
                            signBalance:''
            }
          },
          {
            symbol: 'NASDAQ:AAPL',
            companyName: 'Apple Inc.',
            buyDate: '2015-02-25',
            buyOut: '78.98',
            lastPrice: '',
            sessionChange: '',
            shares: '34',
            balance: '',
            valuableInfo: { signChange:'',
                            signBalance:''
            }
          }];
      } else {
        var portfolio = [];
      }
      return portfolio;
    }

  }
]);