angular.module('reg')
  .controller('EventCtrl', [
    '$scope',
    '$http',
    '$state',
    'settings',
    'Utils',
    'ListingService',
    '$location',
    function($scope, $http, $state, settings, Utils, ListingService, $location){
      $scope.title = "";
      $scope.description = "";
      $scope.createEvent = function() {
        var title = $scope.title;
        var description = $scope.description;
        console.log(title, description);
        ListingService.createEvent(title, description);
        $location.path('/organize');
      };

    }
  ]);
