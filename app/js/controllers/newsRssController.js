finApp.controller('NewsRssController', [ '$scope', 'rssService',
  function($scope, rssService) {
    var nrssc = this;
    var newsFeed = ["http://feeds.feedburner.com/morningstar/glkd"];

    nrssc.viewMoreNews = viewMoreNews;


    (function InitController() {
      rssService.addFeeds(newsFeed);
    })();

    $scope.shownNews = 4;
    $scope.news = rssService.getNews();

    function viewMoreNews(){
      $scope.shownNews += 3;
    }
  }
]);