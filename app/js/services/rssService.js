finApp.factory('rssService',
    function ($http, $q) {
      var service = {};
      var feeds = [];

      /* Google RSS stuff */
      var googleFeedUrl = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK';

      service.parseFeed = parseFeed;
      service.clearFeed = clearFeed;
      service.addFeed = addFeed;
      service.addFeeds = addFeeds;
      service.getNews = getNews;

      return service;

      function parseFeed (url) {
        var deferred = $q.defer();

        $http.jsonp(googleFeedUrl, ({
              method: 'GET',
              params: {q: url}
            }))
            .success(function (json) {
              deferred.resolve(json);
            }).error(function (error) {
          console.log(JSON.stringify(error));
        });
        return deferred.promise;
      }

      function clearFeed () {
        feeds = [];
      }

      function addFeed (url) {
        feeds.push(url);
      }

      function addFeeds (feedsUrl) {
        angular.forEach( feedsUrl, function (url) {
          addFeed(url);
        });
      }

      function getNews () {
        var fetchedNews = [];
        angular.forEach( feeds, function (url) {
          parseFeed(url).then(function (fetchedNew){
            angular.forEach( fetchedNew.responseData.feed.entries, function (fetchedNew) {
              fetchedNew.publishedDate = new Date(fetchedNew.publishedDate);
              fetchedNews.push(fetchedNew);
            });
          });
        });
        return fetchedNews;
      }

    }
);
