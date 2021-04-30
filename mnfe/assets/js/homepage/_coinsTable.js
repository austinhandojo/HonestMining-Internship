export default () => {
  let $labels = $('.coins--label > div');
  let $slider = $('.coins--list .slider');

  let $prev = $('.coins--list .slider-prev');
  let $next = $('.coins--list .slider-next');

  $slider.on('init', () => {
    let styles = '';

    $labels.each((index, el) => {
      styles += `.item-row-${index} { height: ${$(el).outerHeight()}px; }`;
    });

    $('head').append('<style>' + styles);
  });

  $slider.on('afterChange', (e, slick, current) => {
    if (current === 0) {
      $prev.hide();
    } else {
      $prev.show();
    }

    if (
      current + slick.options.slidesToShow ===
      $slider.find('.list-item').length
    ) {
      $next.hide();
    } else {
      $next.show();
    }
  });

  $slider.slick({
    slidesToShow: 3,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          fade: true,
          speed: 500
        }
      }
    ]
  });

  $prev.on('click', () => $slider.slick('prev'));
  $next.on('click', () => $slider.slick('next'));
};
