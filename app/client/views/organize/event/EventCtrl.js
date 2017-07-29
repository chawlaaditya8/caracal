angular.module('reg')
  .controller('EventCtrl', [
    '$scope',
    '$http',
    '$state',
    'settings',
    'Utils',
    'ListingService',
    function($scope, $http, $state, settings, Utils, ListingService){
      $scope.title = "";
      $scope.description = "";
      console.log("test from somewhere");
      $scope.createEvent = function() {
        var title = $scope.title;
        var description = $scope.description;
        console.log(title, description);
        ListingService.createEvent(title, description);
      };

    }
  ]);
