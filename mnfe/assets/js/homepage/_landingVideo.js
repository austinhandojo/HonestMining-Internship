if (process.client) {
  require('~/node_modules/magnific-popup/dist/jquery.magnific-popup.min.js');
  require('~/node_modules/magnific-popup/dist/magnific-popup.css');
}

export default () => {
  $('.section-landing .watch').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade'
  });
};
