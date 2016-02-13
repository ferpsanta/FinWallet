finApp.factory('googleFinanceService',
  function ($http, $q) {
    var service = {};

    /* google finance stuff */
    var queryUrl = 'https://finance.google.com/finance/info?callback=JSON_CALLBACK';


    service.getCurrentValue = getCurrentValue;
    service.getSetCurrentValue = getSetCurrentValue;

    return service;

    /* getCurrentValue given a symbol gets it's current quote*/
    function getCurrentValue(symbol) {
      var deferred = $q.defer();

      $http.jsonp(queryUrl, ({
          method: 'GET', isArray: true,
          params: {client: 'ig', q: symbol}
        }))
        .success(function (json) {
          deferred.resolve(json);
        }).error(function (error) {
        console.log(JSON.stringify(error));
      });
      return deferred.promise;
    }

    /* getSetCurrentValue given a symbol list, gets their current quotes */
    function getSetCurrentValue(symbolSet) {
      var deferred = $q.defer();

      $http.jsonp(queryUrl, ({
          method: 'GET', isArray: true,
          params: {client: 'ig', q: symbolSet.join(',')}
        }))
        .success(function (json) {
          deferred.resolve(json);
        }).error(function (error) {
        console.log(JSON.stringify(error));
      });
      return deferred.promise;
    }
  }
);
