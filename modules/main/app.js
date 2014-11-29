var app = angular.module('angularTest', [
  "ngRoute",
  "mobile-angular-ui"//, 
  //"ngMockE2E"
]);

app.config(['$routeProvider', function ($routeProvider) {

  angular.forEach(routeFiles, function(route, routeUrl) {
    $routeProvider.when(routeUrl, route);
  });

  $routeProvider.otherwise({redirectTo: '/home'});

  // use the HTML5 History API (FOR google friendly URL)
  //http://scotch.io/quick-tips/js/angular/pretty-urls-in-angularjs-removing-the-hashtag
  //$locationProvider.html5Mode(true);
}]);

app.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);