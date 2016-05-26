(function(angular, $) {
  'use strict';

  var SlideShow = ['$scope', function($scope) {

    var reload_interval,
        slide_interval,
        slide_timer,
        each_slide_timer = 2000;

    $scope.images = [];

    $scope.logIn = function() {
      FB.login(function(res) {
        $scope.auth = res.authResponse;
        $scope.$apply();
      }, { scope: 'user_events' });
    };

    $scope.cancel = function(e) {
      if (e.keyCode === 32) {
        $scope.playing = false;
        $scope.loaded = false;
        clearInterval(slide_interval);
        clearInterval(reload_interval);
        $('body').removeAttr('style')
      }
    }

    $scope.play = function() {
      console.log("Loading photos");
      $scope.playing = true;
      FB.api('/' + $scope.event.id + '/photos', function(res) {
        FB.api('/', 'POST', {
          batch: res.data.map(function(image) {
            return { relative_url: image.id + '?fields=images', method: 'GET' }
          })
        }, function(res) {
          $scope.images = res.map(function(obj) {
            return $.parseJSON(obj.body).images[0].source;
          });
          $scope.$apply();

          reload_interval = setTimeout($scope.play, $scope.images.length * each_slide_timer);

        });
      });
    };
  
    $scope.$watch('auth', function(nv, ov) {
      if (nv) {
        FB.api('/me/events', function(res) {
          $scope.events = res;
          $scope.$apply();
        });
      }
    });

    $scope.$watch('images', function(nv, ov) {
      if (ov.length !== nv.length) {
        clearInterval(slide_interval);
        slide_interval = setInterval(function() {
          var img = new Image();
          img.onload = function() {
            $('body').css('background-image', 'url(' + $scope.images[0] + ')');
            $scope.loaded = true;
            $scope.$apply();
          }
          img.src = $scope.images[0];
          $scope.images.push($scope.images.shift());
        }, each_slide_timer);
      }
    }, true);
  }];

  angular.module( 'SlideShow', [ 'ngMaterial' ] )
    .controller("SlideShow", SlideShow );

})(angular, jQuery)
