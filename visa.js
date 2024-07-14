$('.input-cart-number').on('keyup change', function () {
  $t = $(this);

  if ($t.val().length > 3) {
    $t.next().focus();
  }

  var card_number = '';
  $('.input-cart-number').each(function () {
    card_number += $(this).val() + ' ';
    if ($(this).val().length == 4) {
      $(this).next().focus();
    }
  })

  $('.credit-card-box .number').html(card_number);
});

$('#card-holder').on('keyup change', function () {
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-holder').on('keyup change', function () {
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-expiration-month, #card-expiration-year').change(function () {
  m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
  m = (m < 10) ? '0' + m : m;
  y = $('#card-expiration-year').val().substr(2, 2);
  $('.card-expiration-date div').html(m + '/' + y);
})

$('#card-ccv').on('focus', function () {
  $('.credit-card-box').addClass('hover');
}).on('blur', function () {
  $('.credit-card-box').removeClass('hover');
}).on('keyup change', function () {
  $('.ccv div').html($(this).val());
});



setTimeout(function () {
  $('#card-ccv').focus().delay(1000).queue(function () {
    $(this).blur().dequeue();
  });
}, 500);

const numbers = document.getElementsByClassName('num');
for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];
  number.onkeypress = (event) => {
    const key = event.key;
    if (key > '9' || key < '0') {
      event.preventDefault();
    }

  }

}
const toTop = document.getElementById('top');
const toHide = document.getElementById('pay');
function show() {
  toHide.classList.remove('visually-hidden');
  toTop.classList.add('visually-hidden');

}

const form = document.querySelector('form');
form.onsubmit = (event) => {
  event.preventDefault();
  const mainToast = document.getElementById('toast-container');
  const toast = new bootstrap.Toast(mainToast);
  mainToast.style.display = 'flex';
  mainToast.style.margin = 'auto';
  toHide.classList.add('visually-hidden');
  toTop.classList.remove('visually-hidden');
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  const left = screen.width / 2 - 336 / 2;
  mainToast.style.marginLeft = left + 'px';
  const top = screen.height / 2 - 100 / 2;
  mainToast.style.marginTop = top + 'px';
  toast.show();



}



