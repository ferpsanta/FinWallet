finApp.factory('yqlService',
    function ($http, $q) {
      var service = {};

      /* yql stuff */
      var queryStart = 'http://query.yahooapis.com/v1/public/yql?q=';
      var queryEnd = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';


      service.getCurrentValue = getCurrentValue;
      service.getHistoricalData = getHistoricalData;
      service.getSetCurrentValue = getSetCurrentValue;
      service.getSetHistoricalData = getSetHistoricalData;

      return service;

      /* Encodes and replace some special characters */
      function parseYQL(query) {
        return encodeURIComponent(query).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
      }

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

      function getHistoricalData (symbol, startDate, endDate) {
        var deferred = $q.defer();
        var queryBody = 'select * from yahoo.finance.historicaldata \
                          where symbol = "' + symbol + '"           \
                          and startDate = "' + startDate + '"       \
                          and endDate = "' + endDate + '"';
        var url = queryStart + parseYQL(queryBody) + queryEnd;

        console.log(url);

        $http.jsonp(url).success(function(json) {
          var quote = json.query.results.quote;
          deferred.resolve(quote);
        }).error(function(error) {
          console.log(JSON.stringify(error));
        });
        return deferred.promise;
      }

      function getSetHistoricalData (symbolSet, startDate, endDate) {
        var deferred = $q.defer();


        var queryBody = 'select * from yahoo.finance.historicaldata \
                          where symbol = "' + symbol + '"           \
                          and startDate = "' + startDate + '"       \
                          and endDate = "' + endDate + '"';
        var url = queryStart + parseYQL(queryBody) + queryEnd;

        console.log(url);

        $http.jsonp(url).success(function(json) {
          var quote = json.query.results.quote;
          deferred.resolve(quote);
        }).error(function(error) {
          console.log(JSON.stringify(error));
        });
        return deferred.promise;
      }

      function getSetCurrentValue (symbolSet, startDate, endDate) {
        var deferred = $q.defer();

        var queryBody = 'select * from yahoo.finance.historicaldata \
                          where symbol in ("' + symbol + '")        \
                          and startDate = "' + startDate + '"       \
                          and endDate = "' + endDate + '"';
        var url = queryStart + parseYQL(queryBody) + queryEnd;

        console.log(url);

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
