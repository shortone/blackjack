angular.module('appRoutes', [])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  // home page
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  });
}]);
