(function($) {
  var access_token, update_timeout, reload_timeout, images, images_i;

  var update = function() {
    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token + '&callback=foo',
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      success: function(data) {
        console.log(data.data);
        $('body').addClass('loaded');
        images = data.data;
        images_i = images.length;
        reload_timeout = window.setTimeout(reload, 1000);
      }
    });
  }

  var reload = function() {
    $('body').css('background-image', 'url(' + images[images_i].images.standard_resolution.url + ')');
    images_i = images_i - 1;
    if (images_i === 0) images_i = images.length;
  }

  $(document).ready(function() {
    access_token = location.hash.split('=')[1] || undefined;
    if (access_token) {
      $('#play').removeAttr('disabled');
    }
  });

  $('#play').on('click', function() {
    $('body').addClass('playing');
    $('input').attr('disabled', 'disabled');
    update_timeout = window.setTimeout(update, 20000);
  });

  $(window).on('keydown', function(e) {
    if (e.which === 27) {
      $('body').removeClass('playing');
      $('input').removeAttr('disabled');
      window.clearTimeout(update_timeout);
      window.clearTimeout(reload_timeout);
    }
  });

})(jQuery)
