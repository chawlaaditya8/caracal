angular.module('reg')
  .controller('OrganizeCtrl', [
    '$rootScope',
    '$scope',
    '$sce',
    'currentUser',
    'Utils',
    'ListingService',
    'EVENT_INFO',
    'DASHBOARD',
    function($rootScope, $scope, $sce, currentUser, Utils, ListingService, DASHBOARD){
      ListingService
      .getMine()
      .success(function(data){
        $scope.myEvents = data;
      });
    }]);
