finApp.controller ('RegisterController', [ '$location', 'userService', '$uibModalInstance',
  function( $location, userService, $uibModalInstance ) {
    console.log('Using RegisterController');
    var vm = this;
    vm.register = register;
    vm.cancel = cancel;

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
}]);