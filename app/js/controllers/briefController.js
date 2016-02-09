finApp.controller('BriefController', ['$location', 'authService', 'yqlService', '$scope',
  function($location, authService, yqlService, $scope) {
    var bfc = this;

    $scope.usrPortfolio = getUserPortfolio();
    updateUserPortfolio();

    function getUserPortfolio(){
      //Demo values... Not Restfull, in future this must be queried to a DB...
      var portfolio = [ {  symbol: 'GOOGL',
        companyName: '',
        buyDate: '2015-02-25',
        buyOut: '500.00',
        lastPrice: '',
        shares: '123',
        balance: ''
      },
        { symbol: 'GOOGL',
          companyName: '',
          buyDate: '2015-02-25',
          buyOut: '500.00',
          lastPrice: '',
          shares: '100',
          balance: ''
        },
        { symbol: 'GOOGL',
          companyName: '',
          buyDate: '2015-02-25',
          buyOut: '500.00',
          lastPrice: '',
          shares: '52',
          balance: ''
        },
        { symbol: 'GOOGL',
          companyName: '',
          buyDate: '2015-02-25',
          buyOut: '500.00',
          lastPrice: '',
          shares: '34',
          balance: ''
        } ];

      return portfolio;
    }

    function updateUserPortfolio(){
      angular.forEach( $scope.usrPortfolio, function (quote){
        var promise = yqlService.getCurrentValue (quote.symbol);
        promise.then(function(data){
          console.log(data);
          quote.companyName = data.Name;
          quote.lastPrice = data.LastTradePriceOnly;
          quote.balance = (quote.lastPrice*quote.shares)-(quote.buyOut*quote.shares);
        });
      });
    }

  }
]);