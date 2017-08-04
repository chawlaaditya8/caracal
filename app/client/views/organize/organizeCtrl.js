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
      
      $('.ui.dimmer').remove();
      
      $scope.selectedEvent = {};
      $scope.event = 
      ListingService
      .getMine()
      .success(function(data){
        $scope.myEvents = data;
      });

        $scope.selectEvent = function(event){
        console.log("test");
        console.log(event);
        $scope.selectedEvent = event;
        $('.event.modal')
          .modal('show');
      }
    }]);
