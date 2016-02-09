finApp.factory('yqlService',
    function ($http, $q) {
      var service = {};

      /* yql stuff */
      var queryStart = 'https://query.yahooapis.com/v1/public/yql?q=';
      var queryEnd = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';


      service.getCurrentValue = getCurrentValue;
      service.getHistoricalData = getHistoricalData;
      service.getSetCurrentValue = getSetCurrentValue;

      return service;

      /* parseYQL encodes and replace some special characters */
      function parseYQL(query) {
        return encodeURIComponent(query).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
      }

      /* getCurrentValue given a symbol gets it's current quote*/
      function getCurrentValue (symbol){
        var deferred = $q.defer();
        var queryBody = 'select * from yahoo.finance.quote \
                          where symbol = "' + symbol + '"';
        var url = queryStart + parseYQL(queryBody) + queryEnd;


        $http.jsonp(url).success(function(json) {
          var quote = json.query.results.quote;
          deferred.resolve(quote);
        }).error(function(error) {
          console.log(JSON.stringify(error));
        });
        return deferred.promise;
      }

      /* getHistoricalData gets symbols history given two dates (start and end) */
      function getHistoricalData (symbol, startDate, endDate) {
        var deferred = $q.defer();
        var queryBody = 'select * from yahoo.finance.historicaldata \
                          where symbol = "' + symbol + '"           \
                          and startDate = "' + startDate + '"       \
                          and endDate = "' + endDate + '"';
        var url = queryStart + parseYQL(queryBody) + queryEnd;

        $http.jsonp(url).success(function(json) {
          var quote = json.query.results.quote;
          deferred.resolve(quote);
        }).error(function(error) {
          console.log(JSON.stringify(error));
        });
        return deferred.promise;
      }

      /* getSetCurrentValue given a symbol list, gets their current quotes */
      function getSetCurrentValue (symbolSet) {
        var deferred = $q.defer();

        var queryBody = 'select * from yahoo.finance.quote \
                          where symbol in ("' + symbolSet.join('", "') + '")';
        var url = queryStart + parseYQL(queryBody) + queryEnd;

        $http.jsonp(url).success(function(json) {
          var quote = json.query.results.quote;
          deferred.resolve(quote);
        }).error(function(error) {
          console.log(JSON.stringify(error));
        });
        return deferred.promise;
      }
    }
);
