'use strict';

angular.module('cashbox')
  .config(function ($translateProvider) {
    $translateProvider.translations('en', {
      'PREFERENCES': {
        'TITLE': 'Settings',
        'FIELDS': {
          'PRIMARY-CURRENCY': 'Primary Currency',
          'OTHER-CURRENCIES': 'Other Currencies',
          'FIRST-NAME': 'First Name',
          'LAST-NAME': 'Last Name',
          'LANGUAGE': 'Language',
          'EMAIL' : 'Email',
          'OLD-PASSWORD' : 'Old Password',
          'NEW-PASSWORD' : 'New Password',
          'CONFIRM-PASSWORD' : 'Confirm Password'
        },
        'ACTIONS': {
          'DRAG-DROP-AVATAR': 'Drag and drop your image here',
          'SAVE': 'Save Settings',
          'CHANGE-EMAIL': 'Change',
          'UPDATE-EMAIL': 'Update',
          'UPDATE-PASSWORD' : 'Update Password'
        },
        'LANGUAGES': {
          'ENGLISH': 'English',
          'GERMAN': 'Deutsche'
        },
        'CURRENCY-UPDATE-INFO': 'If you change your main currency all old transactions will be converted ' +
        'to your new main currency with todays exchange rate, ' +
        'but you can always switch back.'
      }
    });

    $translateProvider.translations('de', {
      'PREFERENCES': {}
    });
  });
