import Clipboard from 'clipboard';

export default (el, message, success = null, error = null) => {
  let clipboard = new Clipboard(el, {
    text: () => {
      return message;
    }
  });

  clipboard.on('success', success);
  clipboard.on('error', error);

  return clipboard;
};
