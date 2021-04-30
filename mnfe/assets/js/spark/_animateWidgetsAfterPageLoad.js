
export default () => {
  return new Promise(resolve => {
    let speed = 2000;
    let container = $('.page-content-inner');
    let elements = container.find('.widget');
    let total_delay = 0;

    elements.each((index, el) => {
      let $this = $(el);
      let elementOffset = $this.offset();
      let offset = elementOffset.left * 0.8 + elementOffset.top;
      let delay = (parseFloat(offset / speed) - 0.3).toFixed(2);

      $this.css('-webkit-animation-delay', delay + 's').css('-o-animation-delay', delay + 's').css('animation-delay', delay + 's');

      $this.addClass('animated');

      total_delay += delay;
    });

    setTimeout(() => {
      resolve();
    }, total_delay * 1000);
  });
}
