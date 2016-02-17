finApp.controller('NewsRssController', [ '$scope', 'rssService',
  function($scope, rssService) {
    var nrssc = this;
    var newsFeed = ["http://feeds.reuters.com/reuters/financialsNews"];

    nrssc.viewMoreNews = viewMoreNews;


    (function InitController() {
      rssService.addFeeds(newsFeed);
    })();

    $scope.shownNews = 6;
    $scope.news = rssService.getNews();

    console.log($scope.news);

    function viewMoreNews(){
      $scope.shownNews += 3;
    }
  }
]);