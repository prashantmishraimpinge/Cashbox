'use strict';

angular.module('cashbox')
  .controller('TransactionsCtrl',
  function ($scope, $rootScope, $q, $modal, currencyFilter, enumFilter, Transactions, Projects, Categories, Subcategories, Accounts, Tags, Enums) {
    var allTransactions = [],
      currenciesMap = {},
      referenceData = {};

    var filterTransactionsDebounced = _.debounce(function () {
      $scope.$apply(function () {
        filterTransactions();
      });
    }, 250);

    $scope.filteredTransactions = [];
	$scope.filters = {
        timeRange: {}
      };
    $scope.search = {};
    $scope.view = {
      filtersVisible: false
    };

    initProjects();
    initAccounts();
    initTags();
    initCategories();
    initRecurrences();
    initTypes();
    loadTransactions();

    $scope.$watch('search.query', filterTransactionsDebounced);
    $scope.$watchCollection('search.projects', filterTransactionsDebounced);
    $scope.$watchCollection('search.accounts', filterTransactionsDebounced);
    $scope.$watchCollection('search.tags', filterTransactionsDebounced);
    $scope.$watchCollection('search.recurrence', filterTransactionsDebounced);
    $scope.$watchCollection('search.categories', filterTransactionsDebounced);
    $scope.$watchCollection('search.types', filterTransactionsDebounced);
    $scope.$watch('filters.timeRange.start', filterTransactionsDebounced);
    $scope.$watch('filters.timeRange.end', filterTransactionsDebounced);
    $rootScope.$on('transactions.transaction-update.completed', loadTransactions);

    $scope.groupByCategory = function (item) {
      if (item.subcategory) {
        return item.category.name;
      }
    };

    $scope.hasSelectedTransactions = function () {
      return _.some($scope.filteredTransactions, 'selected');
    };

    $scope.getTotalIncome = function () {
      return getTotal(Enums.TransactionType.Income.id);
    };

    $scope.getTotalExpenses = function () {
      return getTotal(Enums.TransactionType.Expenses.id);
    };

    $scope.reset = function () {
      $scope.search = {};
    };

    $scope.createTransaction = function () {
      var createTransaction = $modal.open({
        templateUrl: 'views/transactions/transaction.edit.html',
        controller: 'TransactionEditCtrl',
        resolve: {
          transaction: function () {
            return Transactions.recall();
          }
        }
      });

      createTransaction.result.then(function (transaction) {
        Transactions.save(transaction).$promise
          .then(loadTransactions);
      });
    };

    $scope.deleteSelectedTransactions = function () {

      var selectedTransactions = _.filter($scope.filteredTransactions, 'selected'),
        ids = _.map(selectedTransactions, 'id').join(',');

      if (selectedTransactions.length) {
        var modal = $modal.open({
          templateUrl: 'views/transactions/transactions.delete.html',
          controller: 'TransactionsDeleteCtrl',
          resolve: {
            transactions: function () {
              return selectedTransactions;
            }
          }
        });

        modal.result.then(function () {
          Transactions.deleteMultiple({ids: ids}).$promise.then(loadTransactions);
        });
      }
    };

    $scope.toggleFilters = function () {
      $scope.view.filtersVisible = !$scope.view.filtersVisible;
    };

    function initProjects() {
      $scope.projects = [];
      Projects.query(function (projects) {
        var projectsMap = {};
        projects.forEach(function (project) {
          projectsMap[project.id] = project;
        });

        $scope.projects = projects;
      });
    }

    function initAccounts() {
      $scope.accounts = [];
      Accounts.query(function (accounts) {
        var accountsMap = {};
        accounts.forEach(function (account) {
          accountsMap[account.id] = account;
        });

        $scope.accounts = accounts;
      });
    }


    function initTags() {
      $scope.tags = [];
      Tags.query(function (tags) {
        var tagsMap = {};
        tags.forEach(function (tag) {
          tagsMap[tag.id] = tag;
        });

        $scope.tags = tags;
      });
    }

    function initRecurrences() {
      $scope.recurrences = _.values(angular.copy(Enums.RecurrencePresence));
    }

    function initTypes() {
      $scope.types = _.values(angular.copy(Enums.TransactionType));
    }

    function initCategories() {
      $scope.search.categories = [];

      $q.all({
        categories: Categories.query().$promise,
        subcategories: Subcategories.query().$promise
      }).then(function (data) {
        var categoryItems = [],
          categoriesMap = {};
        data.categories.forEach(function (category) {
          categoriesMap[category.id] = category;
          categoryItems.push({category: category});
        });
        data.subcategories.forEach(function (subcategory) {
          var category = categoriesMap[subcategory.category];
          if (category) {
            categoryItems.push({category: category, subcategory: subcategory});
          }
        });

        $scope.categories = categoryItems;
        referenceData.categories = data.categories;
        referenceData.subcategories = data.subcategories;
      });
    }

    function loadTransactions() {
      Transactions.query(function (transactions) {
        prepareTransactions(transactions);

        allTransactions = transactions;
        filterTransactionsDebounced();
        currenciesMap = getCurrencyMap(transactions);

        function prepareTransactions(transactions) {
          transactions.forEach(function (transaction) {
            transaction.tagIds = [];
            _.forEach(transaction.tags, function (tag) {
              var currencySymbol = transaction.currency && transaction.currency.symbol || '';
              transaction.tagIds.push(tag.id);
              transaction.formattedAmount = currencyFilter(transaction.amount, currencySymbol);
            });
          });
        }

        function getCurrencyMap(transactions) {
          var map = {};
          transactions.forEach(function (transaction) {
            if (transaction.currency) {
              map[transaction.currency.id] = transaction.currency;
            }
          });
          return map;
        }
      });
    }

    function filterTransactions() {
		
      var selectedProjectsMap = {},
        selectedAccountsMap = {},
        selectedTagIds = [],
        selectedCategoriesMap = {},
        checkTypes = false;
		
      if ($scope.search.projects) {
        $scope.search.projects.forEach(function (project) { 
          selectedProjectsMap[project.id] = project;
        });
      }
	  
      if ($scope.search.accounts) {
        $scope.search.accounts.forEach(function (account) {
          selectedAccountsMap[account.id] = account;
        });
      }

      if ($scope.search.tags) {
        $scope.search.tags.forEach(function (tag) {
          selectedTagIds.push(tag.id);
        });
      }

      checkTypes = _.some($scope.search.types, function (index, key) {
        return $scope.search.types[key];
      });

      if ($scope.search.categories) {
        $scope.search.categories.forEach(function (categoryItem) {
          if (!(categoryItem.category.id in selectedCategoriesMap)) {
            selectedCategoriesMap[categoryItem.category.id] = {};
          }
          var subcategoryId = categoryItem.subcategory && categoryItem.subcategory.id || null;
          selectedCategoriesMap[categoryItem.category.id][subcategoryId] = categoryItem;
        });
      }

      $scope.filteredTransactions = allTransactions.filter(function (transaction) {
        if ($scope.search.projects && $scope.search.projects.length) {
          if (!transaction.project || !selectedProjectsMap[transaction.project.id]) {
            return false;
          }
        }

        if ($scope.search.accounts && $scope.search.accounts.length) {
          if (!transaction.account || !selectedAccountsMap[transaction.account.id]) {
            return false;
          }
        }

        if ($scope.search.tags && $scope.search.tags.length) {
          if (!transaction.tags || !_.intersection(transaction.tagIds, selectedTagIds).length) {
            return false;
          }
        }

        if ($scope.search.recurrence &&
          (
          ($scope.search.recurrence === Enums.RecurrencePresence.WithRecurrence.id && !transaction.recurrence) ||
          ($scope.search.recurrence === Enums.RecurrencePresence.WithoutRecurrence.id && transaction.recurrence)
          )) {
          return false;
        }

        if (checkTypes) {
          if (!transaction.type || !$scope.search.types[transaction.type]) {
            return false;
          }
        }

        if ($scope.search.query) {
          if (!hasSubstring($scope.search.query, transaction.note) && !hasSubstring($scope.search.query, '' + transaction.formattedAmount)) {
            return false;
          }
        }

        if ($scope.search.categories && $scope.search.categories.length && transaction.sub_category) {
          var categoryMap = selectedCategoriesMap[transaction.sub_category.category];
          if (!categoryMap) {
            return false;
          }

          if (!(null in categoryMap) && !(transaction.sub_category.id in categoryMap)) {
            return false;
          }
        }
        
        // to filter according to time range. Code added by Harpreet.
        if($scope.filters.timeRange.start && $scope.filters.timeRange.end) {
			var startTime = $scope.filters.timeRange.start,
            endTime = $scope.filters.timeRange.end;
			if (transaction.date && !((moment(transaction.date) >= startTime) && (moment(transaction.date) <= endTime))) {
				return false;
			}
		}
        return true;
        
      });
      
      updateTotals();

      function hasSubstring(what, where) {
        if (!where) {
          return false;
        }

        if (!what) {
          return true;
        }

        return where.toLowerCase().indexOf(what.toLowerCase()) >= 0;
      }
    }

    function updateTotals() {
      var totals = [],
        transactionsGroupedByCurrency = _.groupBy($scope.filteredTransactions, function (transaction) {
          return transaction.currency && transaction.currency.id;
        });

      _.each(transactionsGroupedByCurrency, function (transactions, currencyId) {
        var amount = _.reduce(transactions, function (sum, transaction) {
          return sum + (transaction.amount || 0);
        }, 0);

        totals.push({currency: currenciesMap[currencyId], amount: amount});
      });

      $scope.totals = totals;
    }

    function getTotal(transactionType) {
      return _.reduce($scope.filteredTransactions, function (sum, transaction) {
        if (transaction.type === transactionType) {
          return sum + (transaction.primary_amount || 0);
        }

        return sum;
      }, 0);
    }
  });
