finApp.controller('GlobalPositionController', [ '$scope', '$interval', 'balanceService',
  function($scope, $interval, balanceService) {
    var gpc = this;

    (function InitController() {
      $scope.products = balanceService.getProducts();
    })();

    stopUpdater = $interval(function(){
      if (balanceService.getProducts().length > 0) {
        balanceService.updateProductsBalance();
      }
    }, 4500);

    $scope.$on('$destroy', function() {
      $interval.cancel(stopUpdater);
    });


  }
]);