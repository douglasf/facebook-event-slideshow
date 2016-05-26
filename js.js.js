(function($) {
  var access_token, update_timeout, reload_timeout, images, images_i, tag;

  var update = function() {
    clearInterval(reload_timeout);
    $.ajax({
      url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent/?access_token=' + access_token + '&callback=foo',
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      success: function(data) {
        console.log("New data loaded", data);
        images = data.data;
        images_i = images.length;
        reload_timeout = setInterval(reload, 2000);
      }
    });
  }

  var reload = function() {
    console.log("New background image attached");
    var img = new Image();
    img.onload = function() {
      $('body').addClass('loaded');
      $('body').css('background-image', 'url(' + this.src + ')');
      images_i = images_i - 1;
      if (images_i === 0) images_i = images.length;
    }
    img.src = images[images_i-1].images.standard_resolution.url;
  }

  $('input').on('input', function() {
    if (!$(this).val() && !$('#play').data('href')) {
      $('#play').attr('disabled', 'disabled');
    } else {
      $('#play').removeAttr('disabled');
    }
  });

  $(document).ready(function() {
    $('input').focus();
    access_token = location.hash.split('=')[1] || undefined;
    if (access_token) {
      $('#play').removeAttr('data-href').attr('disabled', 'disabled').text('Starta');
    }
  });

  $('#play').on('click', function() {
    if (false) {
      $('body').addClass('playing');
      $('input').attr('disabled', 'disabled');
      tag = $('input').val();
      update_timeout = setInterval(update, 20000);
    } else {
      FB.login(function(res){
        // Note: The call will only work if you accept the permission request
        console.log(res);
      }, {scope: 'user_events'});
    }
  });

  $(window).on('keydown', function(e) {
    if (e.which === 27) {
      $('body').removeClass('playing loaded');
      $('body').removeAttr('style');
      $('input').removeAttr('disabled');
      clearInterval(update_timeout);
      clearInterval(reload_timeout);
    }
  });

})(jQuery)
