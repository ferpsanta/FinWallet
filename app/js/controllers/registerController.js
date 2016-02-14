finApp.controller ('RegisterController', [ 'userService', 'alertService', '$uibModalInstance', '$sce',
  function( userService, alertService, $uibModalInstance, $sce ) {
    console.log('Using RegisterController');
    var vm = this;
    vm.register = register;
    vm.cancel = cancel;
    vm.confirmPassword = confirmPassword;

    vm.passwordPopoverContent = $sce.trustAsHtml( "<p> Your password must contain at least 6 characters, including 1 capital letter and 1 number. </p>");

    function register() {
      userService.create(vm.user)
          .then(function (response) {
            if (response.success) {
              console.log("Registration successful");
              alertService.addAlert("success", "Registration succesful!");
              $uibModalInstance.close();
            } else {
              console.log(response.message);
              alertService.addAlert("error", response.message);
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
