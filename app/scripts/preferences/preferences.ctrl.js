'use strict';

angular.module('cashbox')
  .controller('PreferencesCtrl', function ($scope, $location, $translate, $q, $modalInstance, Preferences, Auth, CurrentUser, Currency, Enums) {
    var preferences,
      currenciesLoaded = false;

    $scope.model = {
      otherCurrencies: [{}] //do not touch: ui-select magic
    };

    $scope.user = {};

    Preferences.load().then(function (response) {
      preferences = response.data;
      $scope.model.language = preferences.language || getCurrentLanguage();
      $scope.model.primaryCurrency = preferences.primary_currency && preferences.primary_currency.id;

      if (currenciesLoaded) {
        $scope.model.otherCurrencies = _.map(preferences.currencies, 'id');
      }
    });

    Auth.current().then(function (response) {
      var user = response.data;
      $scope.user = {
        firstName: user.first_name,
        lastName: user.last_name,
		email: user.email
      };
    });

    //region Currencies
    $scope.$watch('model.primaryCurrency', function (primaryCurrencyId) {
      var index = _.indexOf($scope.model.otherCurrencies, primaryCurrencyId);
      if (index >= 0) {
        $scope.model.otherCurrencies.splice(index, 1);
      }
    });

    Currency.query().$promise
      .then(function (currencies) {
        $scope.currencies = currencies;
        //ui-select magic - set selection after options get loaded
        $scope.model.otherCurrencies = _.map(preferences.currencies, 'id');
        currenciesLoaded = true;
      });
    //endregion

    //region Languages
    $scope.languages = [Enums.Language.En, Enums.Language.De];

    function getCurrentLanguage() {
      return $translate.use() || $translate.fallbackLanguage();
    }

    //endregion

    //region Avatar
    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
        var file = files[0];
        Auth.uploadPhoto(file).success(function (data) {
          angular.extend(CurrentUser.getPreferences(), { photo: data.photo});
        });
      }
    };
    //endregion


    $scope.save = function () {
      $q.all(savePreferences(), saveUser()).then(function () {
        $modalInstance.close();
      });

      function savePreferences() {
        var saveData = {
          primary_currency: $scope.model.primaryCurrency,
          currencies: $scope.model.otherCurrencies,
          language: $scope.model.language
        };

        return Preferences.save(saveData).then(function (response) {
          var preferences = response.data;
          CurrentUser.setPreferences(preferences);
          return response;
        });
      }

      function saveUser() {
        var saveData = {
          first_name: $scope.user.firstName,
          last_name: $scope.user.lastName
        };

        return Auth.update(saveData).then(function (response) {
          angular.extend(CurrentUser.getUser(), response.data);
          return response;
        });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.getAvatarUrl = function () {
      return CurrentUser.getAvatarUrl();
    };
   /**************Added By Harpreet 15-04-2015 *********/
    
    //remove readonly
    $scope.changeEmail = function() {
		
		// set the state of text field to writable.
		$scope.state = false;
    }
    
    // call update function
    $scope.updateEmailPassword = function($var) {
		
		$q.all(saveUserEP()).then(function () {
         $modalInstance.close();
        });
        
		function saveUserEP() {
		
		// change email process.	
		if($var == 1) {
			var saveEPData = {
			  email: $scope.user.email
			};
		}
		
		// change password process.
		else {
			var saveEPData = {
			  oldPassword: $scope.oldPassword,
			  newPassword: $scope.newPassword
			};
		
		}
		// call API.
        return Preferences.updateEmailPassword(saveEPData).then(function (response) {  
        });
      }
    }
    
    /************************************************/
    
});

// to match the password.
angular.module('cashbox').directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
                control.$setValidity("unique", n);
            });
        }
    };
}]);



