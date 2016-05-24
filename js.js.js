(function($) {
  var access_token;

  $(document).ready(function() {
    access_token = location.hash.split('=')[1] || undefined;
    console.log(access_token);
    if (access_token) {
      $('#play').removeAttr('disabled');
    }
  });

  $('#play').on('click', function() {
    $('body').addClass('playing');
    $('input').attr('disabled', 'disabled');
    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token + '&callback=foo',
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp'
    });
    var foo = function(data) {
      console.log(data);
    };
  });

  $(window).on('keydown', function(e) {
    if (e.which === 27) {
      $('body').removeClass('playing');
      $('input').removeAttr('disabled');
    }
  });

})(jQuery)
