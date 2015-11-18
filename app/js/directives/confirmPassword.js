finApp.directive('confirmPassword', [function () {
  return {
    restrict: 'A',
    scope:true,
    require: 'ngModel',
    link: function (scope, elem , attrs, control) {

      var checker = function () {
                                  var e1 = scope.$eval(attrs.ngModel);
                                  var e2 = scope.$eval(attrs.confirmPassword);
                                  console.log("Comparing "+e1+" and "+e2 );
                                  return e1 == e2;

                                };
      scope.$watch(checker, function (n) {
        control.$setValidity("unique", n);
      });
    }
  };
}]);