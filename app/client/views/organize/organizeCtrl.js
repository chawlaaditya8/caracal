angular.module('reg')
  .controller('OrganizeCtrl', [
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
      .getMine()
      .success(function(data){
        $scope.myEvents = data;
      });
    }]);
