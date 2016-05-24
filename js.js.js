(function($) {
  var access_token, update_timeout, reload_timeout, images, images_i;

  var update = function() {
    clearInterval(reload_timeout);
    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token + '&callback=foo',
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      success: function(data) {
        console.log("New data loaded", data);
        $('body').addClass('loaded');
        images = data.data;
        images_i = images.length;
        reload_timeout = setInterval(reload, 2000);
      }
    });
  }

  var reload = function() {
    console.log("New background image attached");
    $('body').css('background-image', 'url(' + images[images_i-1].images.standard_resolution.url + ')');
    images_i = images_i - 1;
    if (images_i === 0) images_i = images.length;
  }

  $(document).ready(function() {
    access_token = location.hash.split('=')[1] || undefined;
    if (access_token) {
      $('#play').removeAttr('href').text('Starta');
    }
  });

  $('#play').on('click', function() {
    if (!$(this).attr('href')) {
      $('body').addClass('playing');
      $('input').attr('disabled', 'disabled');
      update_timeout = setInterval(update, 20000);
    }
  });

  $(window).on('keydown', function(e) {
    if (e.which === 27) {
      $('body').removeClass('playing');
      $('body').removeAttr('style');
      $('input').removeAttr('disabled');
      clearInterval(update_timeout);
      clearInterval(reload_timeout);
    }
  });

})(jQuery)
