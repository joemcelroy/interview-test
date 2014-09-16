var openTableApp = angular.module('openTableApp', ['ngRoute', 'ui.bootstrap', 'ui.utils', 'ReservationControllers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/reservations', {
      templateUrl: 'templates/reservation-list.html',
      controller: 'ReservationsCtrl'
    }).
    when('/reservations/new', {
      templateUrl: 'templates/reservation-detail.html',
      controller: 'ReservationDetailCtrl'
    }).
    when('/reservations/:reservationId', {
      templateUrl: 'templates/reservation-detail.html',
      controller: 'ReservationDetailCtrl'
    }).
    otherwise({
      redirectTo: '/reservations'
    });
}]);