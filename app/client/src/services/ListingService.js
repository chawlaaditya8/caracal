angular.module('reg')
  .factory('ListingService', [
  '$http',
  'Session',
  function($http, Session){

    var base = '/api/';

    return {

      getAll: function(){
        return $http.get(base + 'events');
      },

      getIt: function(id){
        return $http.get(base + 'event/' + id);
      },

      getMine: function(){
        return $http.get(base + 'myevents');
      },
      createEvent: function(title, description){
        return $http.post(base + 'events', {
          title: title,
          description: description
        })
      }
    };
  }
  ]);
