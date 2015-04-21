'use strict';

angular.module('cashbox').factory('Transactions', function ($resource, $http, $q, Enums, HttpTransformDate) {
  var transformResponse = HttpTransformDate.transformFromString('date'),
    transformRequest = HttpTransformDate.transformToDateOnly('date');

  var service = $resource('api/transactions/:transactionId', {transactionId: '@id'}, {
    query: {
      isArray: true,
      transformResponse: transformResponse
    },
    save: {
      url: 'api/transactions',
      method: 'POST',
      transformRequest: transformRequest,
      transformResponse: transformResponse
    },
    update: {
      url: 'api/transactions/:transactionId',
      params: {transactionId: '@id'},
      method: 'PUT',
      transformRequest: transformRequest,
      transformResponse: transformResponse
    },
    delete: {
      url: 'api/transactions/:transactionId',
      params: {transactionId: '@id'},
      method: 'DELETE'
    },
    deleteMultiple: {
      url: 'api/transactions',
      method: 'DELETE'
    }
  });

  service.blank = function () {
    return {
      type: Enums.TransactionType.Expenses.id,
      date: new Date(),
      tags: []
    };
  };

  service.recall = function () {
    return $http.get('api/transactions/recall', {
      transformResponse: transformResponse
    }).then(function (response) {
      var transaction = response.data;
      return _.defaults(service.blank(), {
        currency: transaction.currency,
        category: transaction.category,
        sub_category: transaction.sub_category,
        account: transaction.account,
        project: transaction.project
      });
    }, function (response) {
      if (response.status === 404) {
        //user has no available transactions
        return service.blank();
      }
    });
  };

  return service;
});
