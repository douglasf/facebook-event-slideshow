(function($) {

  $('#play').on('click', function() {
    $('body').addClass('playing');
    $('input').attr('disabled', 'disabled');
    $.get('https://api.instagram.com/v1/tags/snowy/media/recent?client_id=31c7a58c9b2d44aaa996be3704daaea3&callback=foo');
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
