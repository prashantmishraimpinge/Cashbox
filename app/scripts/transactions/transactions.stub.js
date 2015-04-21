'use strict';

angular.module('cashbox').run(function ($httpBackend, nobackend) {
  if (!nobackend) {
    return;
  }

  var transactions = [
    {
      'id': 1,
      'date': '2015-04-08T00:07:19Z',
      'amount': 10.0,
      'currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'primary_amount': 10.0,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'sub_category': {
        'id': 1,
        'name': 'Bars & Restaurants',
        'category': 1
      },
      'category': {
        'id': 1,
        'name': 'Eating Out'
      },
      'account': {
        'id': 1,
        'name': 'Cash'
      },
      'project': {
        'id': 1,
        'name': 'Project One'
      },
      'type': 'EXPENSES',
      'note': 'breakfast @ Java',
      'recurrence': {
        'id': 1,
        'frequency': 'DAILY'
      },
      'tags': [
        {
          'id': 1,
          'name': 'Tag One'
        },
        {
          'id': 3,
          'name': 'Tag Three'
        }
      ]
    },
    {
      'id': 2,
      'date': '2015-04-11T00:01:29Z',
      'amount': 10.0,
      'currency': {
        'id': 2,
        'code': 'GBP',
        'symbol': '\u00a3',
        'name': ''
      },
      'primary_amount': 20.0,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'category': {
        'id': 1,
        'name': 'Eating Out'
      },
      'sub_category': {
        'id': 1,
        'name': 'Bars & Restaurants',
        'category': 1
      },
      'account': {
        'id': 1,
        'name': 'Cash'
      },
      'project': null,
      'type': 'EXPENSES',
      'note': 'date with Sheila',
      'recurrence': null,
      'tags': [
        {
          'id': 2,
          'name': 'Tag Two'
        }
      ]
    },
    {
      'id': 3,
      'date': '2015-04-08T00:07:19Z',
      'amount': 30.0,
      'currency': {
        'id': 3,
        'code': 'EUR',
        'symbol': '$',
        'name': ''
      },
      'primary_amount': 40.0,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'category': {
        'id': 1,
        'name': 'Eating Out'
      },
      'sub_category': {
        'id': 769,
        'name': 'Fast-food',
        'category': 1
      },
      'account': {
        'id': 2,
        'name': 'Citibank'
      },
      'project': {
        'id': 2,
        'name': 'Project Two'
      },
      'type': 'EXPENSES',
      'note': 'coffee with Daisy',
      'recurrence': {
        'id': 2,
        'frequency': 'WEEKLY'
      },
      'tags': [
        {
          'id': 3,
          'name': 'Tag Three'
        }
      ]
    },
    {
      'id': 7,
      'date': '2014-12-08T00:07:19Z',
      'amount': 60.0,
      'currency': {
        'id': 2,
        'code': 'GBP',
        'symbol': '\u00a3',
        'name': ''
      },
      'primary_amount': 120.0,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'category': {
        'id': 2,
        'name': 'Car'
      },
      'sub_category': {
        'id': 770,
        'name': 'Gas',
        'category': 2
      },
      'account': {
        'id': 2,
        'name': 'Citibank'
      },
      'project': {
        'id': 1,
        'name': 'Project One'
      },
      'type': 'EXPENSES',
      'note': '',
      'recurrence': null,
      'tags': [
        {
          'id': 2,
          'name': 'Tag Two'
        }
      ]
    },
    {
      'id': 8,
      'date': '2015-01-08T00:07:19Z',
      'amount': 120.0,
      'currency': {
        'id': 2,
        'code': 'GBP',
        'symbol': '\u00a3',
        'name': ''
      },
      'primary_amount': 240.0,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'category': {
        'id': 3,
        'name': 'Travel'
      },
      'sub_category': {
        'id': 773,
        'name': 'Hotels',
        'category': 3
      },
      'account': {
        'id': 2,
        'name': 'Citibank'
      },
      'project': {
        'id': 1,
        'name': 'Project One'
      },
      'type': 'EXPENSES',
      'note': 'Stay at London',
      'recurrence': {
        'id': 4,
        'frequency': 'YEARLY'
      },
      'tags': [
        {
          'id': 3,
          'name': 'Tag Three'
        }
      ]
    },
    {
      'id': 9,
      'date': '2015-04-08T00:07:19Z',
      'amount': 1600,
      'currency': {
        'id': 2,
        'code': 'GBP',
        'symbol': '\u00a3',
        'name': ''
      },
      'primary_amount': 3600,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'category': {
        'id': 5,
        'name': 'Salary'
      },
      'sub_category': {
        'id': 776,
        'name': 'Bonus',
        'category': 6
      },
      'account': {
        'id': 2,
        'name': 'Citibank'
      },
      'project': {
        'id': 1,
        'name': 'Project One'
      },
      'type': 'INCOME',
      'note': 'Bonus for 4th quarter!',
      'recurrence': [],
      'tags': [
        {
          'id': 3,
          'name': 'Tag Three'
        }
      ]
    },
    {
      'id': 10,
      'date': '2015-04-08T00:07:19Z',
      'amount': 12.45,
      'currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'primary_amount': 12.45,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'account': {
        'id': 1,
        'name': 'Cash'
      },
      'project': {
        'id': 1,
        'name': 'Project One'
      },
      'type': 'EXPENSES',
      'recurrence': {
        'id': 1,
        'frequency': 'DAILY'
      },
      'tags': []
    },
    {
      'id': 11,
      'date': '2015-04-08T00:07:19Z',
      'amount': 12.00,
      'currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'primary_amount': 12.00,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'account': {
        'id': 1,
        'name': 'Cash'
      },
      'project': {
        'id': 1,
        'name': 'Project One'
      },
      'type': 'EXPENSES',
      'recurrence': {
        'id': 1,
        'frequency': 'DAILY'
      },
      'tags': []
    },
    {
      'id': 12,
      'date': '2015-04-08T00:07:19Z',
      'amount': 1000.00,
      'currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'primary_amount': 1000.00,
      'primary_currency': {
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': ''
      },
      'account': {
        'id': 1,
        'name': 'Cash'
      },
      'source_account': {
        'id': 2,
        'name': 'Citibank'
      },
      'project': null,
      'type': 'TRANSFER',
      'recurrence': null,
      'tags': []
    }
  ];

  var list = [];

  for (var i = 0; i < 10; i++) {
    var transaction = angular.copy(transactions[i % transactions.length]);
    transaction.id = i + 1;
    list.push(transaction);
  }

  $httpBackend.whenGET(/^api\/transactions$/).respond(list);

  $httpBackend.whenPOST(/^api\/transactions/).respond(function () {
    var transaction = list[0];
    transaction.id = 999;
    return [200, transaction];
  });

  $httpBackend.whenGET(/^api\/transactions\/recall$/).respond(list[0]);

  //delete multiple
  $httpBackend.whenDELETE(/^api\/transactions(\?\S+)*$/).respond();

  //delete single
  $httpBackend.whenDELETE(/^api\/transactions\/(\d+)$/).respond();

});
