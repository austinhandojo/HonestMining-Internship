export default () => {
  let $slider = $('.how--group .row');

  $slider.slick({
    slidesToShow: 1,
    infinite: false,
    focusOnSelect: false,
    centerMode: true,
    arrows: false,
    dots: true,
    responsive: [{
      breakpoint: 9999,
      settings: 'unslick'
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }]
  });
};
