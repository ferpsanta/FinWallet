finApp.directive('newsRss', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/newsRss.html',
    controller: 'NewsRssController',
    controllerAs: 'nrssc'
  };
});