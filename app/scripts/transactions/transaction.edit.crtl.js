'use strict';

angular.module('cashbox').controller('TransactionEditCtrl',
  function ($scope, $modalInstance, $timeout, focus, Enums, Transactions, transaction) {
    $scope.transaction = transactionToModel(transaction ? transaction : Transactions.blank());
    $scope.model = {};

    $timeout(function () {
      focus('transaction-amount-field');
    });

    $scope.transactionTypes = [
      Enums.TransactionType.Expenses,
      Enums.TransactionType.Income,
      Enums.TransactionType.Transfer
    ];

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.createTransaction = function () {
      var transaction = angular.copy($scope.transaction);

      transaction.tags = _.filter(transaction.tags, function (tagId) {
        //TODO: replace this check by id
        return tagId >= 0;
      });

      transaction.new_tags = _.map($scope.model.newTags, function (tag) {
        return tag.name;
      });

      $modalInstance.close(transaction);
    };

    $scope.isTransactionTypeTransfer = function () {
      return $scope.transaction.type === Enums.TransactionType.Transfer.id;
    };

    $scope.$watch('transaction.account', function (accountId) {
      if (accountId && accountId === $scope.transaction.source_account) {
        $scope.transaction.source_account = null;
      }
    });

    $scope.$watch('transaction.source_account', function (source_accountId) {
      if (source_accountId && source_accountId === $scope.transaction.account) {
        $scope.transaction.account = null;
      }
    });

    function transactionToModel(transaction) {
      return {
        id: transaction.id,
        type: transaction.type,
        date: transaction.date,
        amount: transaction.amount,
        currency: transaction.currency && transaction.currency.id,
        category: transaction.category && transaction.category.id,
        sub_category: transaction.sub_category && transaction.sub_category.id,
        account: transaction.account && transaction.account.id,
        source_account: transaction.source_account && transaction.source_account.id,
        project: transaction.project && transaction.project.id,
        recurrence: transaction.recurrence && transaction.recurrence.id,
        tags: _.map(transaction.tags, function (tag) {
          return tag.id;
        }),
        note: transaction.note
      };
    }
  });
