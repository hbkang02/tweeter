$(document).ready(function () {

  $('.textInput').on('keyup', function () {

    const maxLength = 140;
    const length = $(this).val().length;
    const $charCount = $(this).siblings('.counter');
    const remainingCharacters = maxLength - length;

    $charCount.text(remainingCharacters);

    maxLength < length ? $charCount.addClass('warning') : $charCount.removeClass('warning');
  })
});

