'use strict';

angular.module('cashbox').run(
  function ($httpBackend, nobackend) {
    if (!nobackend) {
      return;
    }

    var currencies = [{
        'id': 1,
        'code': 'USD',
        'symbol': '$',
        'name': 'United States Dollar'
      }, {
        'id': 2,
        'code': 'GBP',
        'symbol': 'G',
        'name': 'Great Britain Pound'
      }, {
        'id': 3,
        'code': 'EUR',
        'symbol': 'E',
        'name': 'European Union Euro'
      }, {
        'id': 4,
        'code': 'RUR',
        'symbol': 'R',
        'name': 'Russian Rouble'
      }],
      preferences = {
        primary_currency: currencies[0],
        currencies: [currencies[2], currencies[3]],
        language: 'en'
      };


    $httpBackend.whenGET(/^api\/users\/current\/preferences/).respond(preferences);
    $httpBackend.whenPUT(/^api\/users\/current\/preferences/).respond(preferences);
  });
