'use strict';

angular.module('cashbox', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.select',
  'smart-table',
  'pascalprecht.translate',
  'focusOn',
  'angular-http-transform-date',
  'angularFileUpload',
  'matchMedia'
])
  .config(function ($routeProvider, $locationProvider) {
    //override $routeProvider.when to automatically inject UserResolver
    //to routes requiring authentication
    var originalWhen = $routeProvider.when;
    $routeProvider.when = function (path, route) {
      if (!route.allowAnonymous) {
        route.resolve = route.resolve || {};
        angular.extend(route.resolve, {
          resolvedCurrentUser: ['CurrentUser', function (CurrentUser) {
            return CurrentUser.resolve();
          }]
        });
      }
      return originalWhen.call($routeProvider, path, route);
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard/dashboard.html'
      })
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'LoginCtrl',
        allowAnonymous: true
      })
      .when('/analysis', {
        templateUrl: 'views/analysis/analysis.html',
        controller: 'AnalysisCtrl'
      })
      .when('/transactions', {
        templateUrl: 'views/transactions/transactions.html',
        controller: 'TransactionsCtrl'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts/accounts.html',
        controller: 'AccountsCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/categories', {
        templateUrl: 'views/categories/categories.html',
        controller: 'CategoriesCtrl'
      })
      .when('/tags', {
        templateUrl: 'views/tags/tags.html',
        controller: 'TagsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })
  .config(function ($translateProvider) {
    $translateProvider.useLocalStorage();
    $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
      'en_US': 'en',
      'en_UK': 'en',
      'de_DE': 'de',
      'de_CH': 'de'
    });

    $translateProvider.fallbackLanguage('en');
    $translateProvider.determinePreferredLanguage();
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('ApiAccessInterceptor');
    $httpProvider.interceptors.push('AuthTokenInterceptor');
    $httpProvider.interceptors.push('UrlRewriteInterceptor');
  })
  .run(function (CurrentUser) {
    CurrentUser.init();
  });
