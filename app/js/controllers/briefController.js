finApp.controller('BriefController', ['$scope', '$location', '$interval', 'authService', 'yqlService',
  function($scope, $location, $interval, authService, yqlService) {
    var bfc = this;

    $scope.usrPortfolio = getUserPortfolio();
    //$interval(updateUserPortfolio, 5000);
    updateUserPortfolio();

    function getUserPortfolio(){
      //Demo values... Not Restfull, in future this must be queried to a DB...
      var portfolio = [ {  symbol: 'GOOGL',
        companyName: '',
        buyDate: '2015-02-25',
        buyOut: '632.10',
        lastPrice: '',
        shares: '123',
        balance: ''
      },
        { symbol: 'YHOO',
          companyName: '',
          buyDate: '2015-02-25',
          buyOut: '22.23',
          lastPrice: '',
          sessionChange: '',
          shares: '100',
          balance: ''
        },
        { symbol: 'MSFT',
          companyName: '',
          buyDate: '2015-02-25',
          buyOut: '55.00',
          lastPrice: '',
          sessionChange: '',
          shares: '52',
          balance: ''
        },
        { symbol: 'AAPL',
          companyName: '',
          buyDate: '2015-02-25',
          buyOut: '78.98',
          lastPrice: '',
          sessionChange: '',
          shares: '34',
          balance: ''
        } ];

      return portfolio;
    }

    function updateUserPortfolio(){
      var symbolSet = [];
      var userQuote;
      var quote;

      angular.forEach( $scope.usrPortfolio, function (quote){
        symbolSet.push(quote.symbol);
      });
      var promise = yqlService.getSetCurrentValue(symbolSet);
      promise.then(function(data){

        for (var i = 0; i < data.length; i++) {
          userQuote = $scope.usrPortfolio[i];
          quote = data[i];

          userQuote.companyName = quote.Name;
          userQuote.lastPrice = quote.LastTradePriceOnly;
          userQuote.sessionChange = quote.Change;
          userQuote.balance = (userQuote.lastPrice-userQuote.buyOut)*userQuote.shares;
        }
      });
    }
  }
]);