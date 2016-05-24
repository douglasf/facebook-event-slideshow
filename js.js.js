(function($) {
  var feed = new Instafeed({
    get: 'tagged',
    tagName: 'awesome',
    clientId: '31c7a58c9b2d44aaa996be3704daaea3',
    success: function(data) {
      console.log(data);
    }
  });

  $('#play').on('click', function() {
    $('body').addClass('playing');
    $('input').attr('disabled', 'disabled');
    feed.run();
  });

  $(window).on('keydown', function(e) {
    if (e.which === 27) {
      $('body').removeClass('playing');
      $('input').removeAttr('disabled');
    }
  });

})(jQuery)
