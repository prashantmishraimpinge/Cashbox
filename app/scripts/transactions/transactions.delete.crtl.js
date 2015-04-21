'use strict';

angular.module('cashbox').controller('TransactionsDeleteCtrl',
  function ($scope, $modalInstance, transactions) {
    $scope.transactions = transactions || [];

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.deleteTransactions = function () {
      $modalInstance.close();
    };
  });
