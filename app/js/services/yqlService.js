finApp.factory('yqlService',
    function () {
      var service = {};

      /* yql stuff */
      var queryStart = 'http://query.yahooapis.com/v1/public/yql?q=';
      var queryEnd = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';


      service.getCurrentValue = getCurrentValue;
      service.getHistoricalData = getHistoricalData;

      return service;

      /* Encodes and replace some special characters */
      function parseYQL(query) {
        return encodeURIComponent(query).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
      }

      function getCurrentValue (symbol){
        var queryBody = 'select * from yahoo.finance.quote \
                          where symbol = "' + symbol + '"';
        var url = queryStart + parseYQL(queryBody) + queryEnd;

        console.log (url);
      }

      function getHistoricalData (symbol, startDate, endDate) {
        var queryBody = 'select * from yahoo.finance.historicaldata \
                          where symbol = "' + symbol + '"           \
                          and startDate = "' + startDate + '"       \
                          and endDate = "' + endDate + '"';
        var url = queryStart + parseYQL(queryBody) + queryEnd;

        console.log(url);
      }
    }
);/**
 * Created by root on 8/02/16.
 */
