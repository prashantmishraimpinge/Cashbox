'use strict';

angular.module('cashbox')
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      'TRANSACTIONS': {
        'SEARCH-PLACEHOLDER': 'Search...',
        'SELECT-CATEGORIES-PLACEHOLDER': 'Select Categories...',
        'TOTAL': 'Total',
        'TRANSACTION-TYPE': {
          'EXPENSES': 'Expenses',
          'INCOME': 'Income',
          'TRANSFER': 'Transfer'
        },
        'ACTIONS': {
          'ADD': 'Add Transaction',
          'DELETE-BATCH': 'Delete',
          'DELETE-BATCH-TITLE': 'Delete Selected Transactions',
          'SAVE': 'Save Transaction'
        },
        'FILTERS': {
          'SHOW': 'Show Filters',
          'HIDE': 'Hide Filters'
        },
        'TRANSACTIONS-ADD-EDIT-DIALOG': {
          'TITLE': 'Transaction'
        },
        'TRANSACTIONS-DELETE-DIALOG': {
          'TITLE': 'Delete Transaction',
          'CONFIRM': 'Are you sure you want to delete <strong>{{count}}</strong> transaction(s)?'
        },
        'TRANSACTIONS-GRID': {
          'MONEY-IN': 'Inc:',
          'MONEY-OUT': 'Exp:'
        },
        'TIME-RANGE': {
          'ALL-TIME': 'All Time',
          'CURRENT-MONTH': 'Current Month',
          'LAST-3-MONTHS': 'Last 3 Months',
          'LAST-6-MONTHS': 'Last 6 Months',
          'LAST-12-MONTHS': 'Last 12 Months'
        },
        'FIELDS': {
          'DATE': 'Date',
          'AMOUNT': 'Amount',
          'CURRENCY-PLACEHOLDER': 'Select Currency',
          'CATEGORY': 'Category',
          'ACCOUNT': 'Account',
          'ACCOUNT-TO': 'To Account',
          'ACCOUNT-FROM': 'From Account',
          'PROJECT': 'Project',
          'RECURRENCE': 'Recurrence',
          'TAGS': 'Tags',
          'NOTE': 'Note',
          'TIME-RANGE': 'Time Range',
        },
        'TRANSACTIONS-COUNT': '{{count}} transaction(s)'
      }
    });

    $translateProvider.translations('de', {
      'TRANSACTIONS': {
        'SEARCH-PLACEHOLDER': 'Suche...',
        'SELECT-CATEGORIES-PLACEHOLDER': 'Wählen Sie Kategorien...',
        'TOTAL': 'Gesamt',
        'TRANSACTION-TYPE': {
          'EXPENSES': 'Kosten',
          'INCOME': 'Einkommen'
        }
      }
    });
  });
