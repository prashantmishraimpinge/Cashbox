'use strict';

angular.module('cashbox')
  .factory('Preferences', function ($http) {
    return {
      load: load,
      save: save,
      updateEmailPassword: updateEmailPassword
    };

    function load() {
      return $http.get('api/users/current/preferences');
    }

    function save(preferences) {
      return $http.put('api/users/current/preferences', preferences);
    }
    
    // to update email and password.
    function updateEmailPassword(eppreferences) {
      return $http.put('api/users/current/email-password', eppreferences);
    }
  });
