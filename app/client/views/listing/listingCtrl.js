angular.module('reg')
  .controller('ListingCtrl', [
    '$rootScope',
    '$scope',
    '$sce',
    'currentUser',
    'settings',
    'Utils',
    'ListingService',
    'EVENT_INFO',
    'DASHBOARD',
    function($rootScope, $scope, $sce, currentUser, settings, Utils, ListingService, DASHBOARD){

      ListingService
        .getAll()
        .success(function(data){
          $scope.events = data;
        });

    }]);
