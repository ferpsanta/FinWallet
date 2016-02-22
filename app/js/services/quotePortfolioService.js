finApp.factory('quotePortfolioService', [ 'yqlService', 'googleFinanceService',
  function (yqlService, googleFinanceService) {

    var service = {};
    quotesPortfolio = [];

    service.getQuotePortfolio = getQuotePortfolio;
    service.setQuotePortfolio = setQuotePortfolio;
    service.updateQuotePortfolio = updateQuotePortfolio;
    service.addQuote = addQuote;
    service.removeQuoteIndex = removeQuoteIndex;
    service.removeQuote = removeQuote;
    service.clearQuotePortfolio = clearQuotePortfolio;
    service.getByEmail = getByEmail;

    return service;

    function setQuotePortfolio(email) {
      quotesPortfolio = getByEmail(email);
      if( quotesPortfolio.length > 0) {
        updateQuotePortfolio();// Portfolio first update
      }
    }

    function getQuotePortfolio (){
      return quotesPortfolio;
    }

    function updateQuotePortfolio(){
      var symbolSet = [];
      var userQuote;
      var quote;

      angular.forEach( quotesPortfolio, function (quote) {
        symbolSet.push(quote.ticker+":"+quote.exchange);
      });

      var promise = googleFinanceService.getSetCurrentValue(symbolSet);

      promise.then(function(data){

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < quotesPortfolio.length; j++) {

            userQuote = quotesPortfolio[j];
            quote = data[i];

            if(quote.t === userQuote.ticker && quote.e === userQuote.exchange){

              userQuote.transactionID = i;
              userQuote.lastPrice = quote.l;
              userQuote.openPrice = quote.pcls_fix;
              userQuote.sessionChange = quote.c;
              userQuote.balance = ((userQuote.lastPrice - userQuote.buyOut) * userQuote.shares - userQuote.commission).toFixed(3);
              userQuote = portfolioUtils.evaluateValuableInfo(userQuote);

            }
          }
        }
      });
    }

    function addQuote (symbol, companyName, date, buyOut, commission, shares){
      var symbolSplit = symbol.split(":");
      quotesPortfolio.push({  transactionID: quotesPortfolio.length,
                        ticker: symbolSplit[0],
                        exchange: symbolSplit[1],
                        companyName: companyName,
                        buyDate: date,
                        buyOut: buyOut,
                        openPrice: '',
                        lastPrice: '',
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
      return quotesPortfolio.splice(quoteIndex, 1);
    }

    function removeQuote (quote){
      return removeQuoteIndex(quotesPortfolio.indexOf(quote));
    }

    function clearQuotePortfolio (){
      quotesPortfolio = [];
    }

    function getByEmail(email){
      //Demo values... Not Restfull, in future this must be queried to a DB...
      if (email == 'demo') {
        var quotesPortfolio = [{
          ticker: 'CABK',
          exchange: 'BME',
          companyName: 'Caixabank',
          buyDate: '2015-02-25',
          buyOut: '4.04',
          openPrice: '',
          lastPrice: '',
          shares: '725',
          commission: '0.00',
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
            buyOut: '8.05',
            openPrice: '',
            lastPrice: '',
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
            ticker: 'CABK',
            exchange: 'BME',
            companyName: 'Caixabank',
            buyDate: '2015-02-25',
            buyOut: '3.34',
            openPrice: '',
            lastPrice: '',
            sessionChange: '',
            shares: '321',
            commission: '0.00',
            balance: '',
            valuableInfo:{
              signChange:'',
              signBalance:'',
              lastPriceData: ''
            }
          },
          {
            ticker: 'TEF',
            exchange: 'BME',
            companyName: 'Telefonica S.A.',
            buyDate: '2015-02-25',
            buyOut: '13.73',
            openPrice: '',
            lastPrice: '',
            sessionChange: '',
            shares: '67',
            commission: '0.00',
            balance: '',
            valuableInfo:{
              signChange:'',
              signBalance:'',
              lastPriceData: ''
            }
          }];
      } else {
        var quotesPortfolio = [];
      }
      return quotesPortfolio;
    }

  }
]);


var portfolioUtils = {
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