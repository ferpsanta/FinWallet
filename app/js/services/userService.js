finApp.factory('userService', ['$timeout', '$filter', '$q',
  function ($timeout, $filter, $q) {
    var service = {};

    service.getAll = getAll;
    service.getById = getById;
    service.getByEmail = getByEmail;
    service.create = create;
    service.update = update;
    service.Delete = Delete;

    return service;

    function getAll() {
      var deferred = $q.defer();
      deferred.resolve(getUsers());
      return deferred.promise;
    }

    function getById(id) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getUsers(), { id: id });
      var user = filtered.length ? filtered[0] : null;
      deferred.resolve(user);
      return deferred.promise;
    }

    function getByEmail(email) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getUsers(), { email: email });
      var user = filtered.length ? filtered[0] : null;
      deferred.resolve(user);
      return deferred.promise;
    }

    function create(user) {
      var deferred = $q.defer();

      // simulate api call with $timeout
      $timeout(function () {
        getByEmail(user.email)
            .then(function (duplicateUser) {
              if (duplicateUser !== null) {
                deferred.resolve({ success: false, message: 'This "' + user.email + '" is already in use' });
              } else {
                var users = getUsers();

                // assign id
                var lastUser = users[users.length - 1] || { id: 0 };
                user.id = lastUser.id + 1;

                // save to local storage
                users.push(user);
                setUsers(users);

                deferred.resolve({ success: true });
              }
            });
      }, 1000);

      return deferred.promise;
    }

    function update(user) {
      var deferred = $q.defer();

      var users = getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          users[i] = user;
          break;
        }
      }
      setUsers(users);
      deferred.resolve();

      return deferred.promise;
    }

    function Delete(id) {
      var deferred = $q.defer();

      var users = getUsers();
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.id === id) {
          users.splice(i, 1);
          break;
        }
      }
      setUsers(users);
      deferred.resolve();

      return deferred.promise;
    }

    // private functions

    function getUsers() {
      if(!localStorage.users){
        localStorage.users = JSON.stringify([]);
      }

      return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
      localStorage.users = JSON.stringify(users);
    }
  }
]);