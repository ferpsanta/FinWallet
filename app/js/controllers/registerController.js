finApp.controller ('RegisterController', [ '$location', 'userService', '$uibModalInstance', '$sce',
  function( $location, userService, $uibModalInstance, $sce ) {
    console.log('Using RegisterController');
    var vm = this;
    vm.register = register;
    vm.cancel = cancel;
    vm.confirmPassword = confirmPassword;

    vm.passwordPopoverContent = $sce.trustAsHtml( "<p> Your password must contain at least 6 characters, including 1 capital letter and 1 number. </p>");

    function register() {
      console.log('Trying to register...');

      console.log(vm.user.name);//TODO:Remove
      console.log(vm.user.email);//TODO:Remove
      console.log(vm.user.password);//TODO:Remove

      vm.dataLoading = true;
      userService.Create(vm.user)
          .then(function (response) {
            if (response.success) {
              $location.path('/login');
            } else {
              vm.dataLoading = false;
            }
          });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function confirmPassword() {
      return (vm.user.password == vm.user.confirmPassword);
    }
}]);