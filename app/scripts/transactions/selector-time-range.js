'use strict';

angular.module('cashbox')
  .directive('selectorTimeRangeTransactions', function () {
    return {
      restrict: 'E',
      scope: {
        startTime: '=',
        endTime: '='
      },
      templateUrl: 'views/transactions/selector-time-range.html',
      controller: controller
    };

    function controller($scope) {
      $scope.intervals = [
        {
          title: 'TRANSACTIONS.TIME-RANGE.ALL-TIME'
        },
        {
          title: 'TRANSACTIONS.TIME-RANGE.CURRENT-MONTH',
          startTime: moment().startOf('month'),
          endTime: moment().endOf('month')
        },
        {
          title: 'TRANSACTIONS.TIME-RANGE.LAST-3-MONTHS',
          startTime: moment().subtract(2, 'months').startOf('month'),
          endTime: moment().endOf('month')
        },
        {
          title: 'TRANSACTIONS.TIME-RANGE.LAST-6-MONTHS',
          startTime: moment().subtract(5, 'months').startOf('month'),
          endTime: moment().endOf('month')
        },
        {
          title: 'TRANSACTIONS.TIME-RANGE.LAST-12-MONTHS',
          startTime: moment().subtract(11, 'months').startOf('month'),
          endTime: moment().endOf('month')
        }
      ];

      $scope.model = {
        selection: $scope.intervals[0]
      };

      $scope.$watch('model.selection', function (interval) {
        $scope.startTime = interval && interval.startTime || null;
        $scope.endTime = interval && interval.endTime || null;
      });
    }
  });
