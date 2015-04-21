'use strict';
angular.module('cashbox')
  .directive('transactionsGrid', function () {
    return {
      restrict: 'E',
      scope: {
        source: '='
      },
      templateUrl: 'views/transactions/transactions-grid.html',
      controller: controller
    };

    function controller($scope, $rootScope, $modal, screenSize, Transactions, Enums) {
      $scope.view = {
        mobile: screenSize.is('xs')
      };

      $scope.editTransaction = function (transaction) {
        var editTransaction = $modal.open({
          templateUrl: 'views/transactions/transaction.edit.html',
          controller: 'TransactionEditCtrl',
          resolve: {
            transaction: function () {
              return transaction;
            }
          }
        });

        editTransaction.result.then(function (saveData) {


          Transactions.update(saveData).$promise
            .then(function (updatedTransaction) {
              $rootScope.$broadcast('transactions.transaction-update.completed', updatedTransaction);
            });
        });
      };

      $scope.isTransactionTypeTransfer = function (transaction) {
        return transaction.type === Enums.TransactionType.Transfer.id;
      };

      screenSize.on('xs', function (isMobile) {
        $scope.view.mobile = isMobile;
      });
    }
  });
