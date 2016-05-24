(function($) {

  $('#play').on('click', function() {
    $('body').addClass('playing');
    $('input').attr('disabled', 'disabled');
  });

  $(window).on('keydown', function(e) {
    if (e.which === 27) {
      $('body').removeClass('playing');
      $('input').removeAttr('disabled');
    }
  });

})(jQuery)
