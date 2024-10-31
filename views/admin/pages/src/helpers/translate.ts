const __ = (text: string) => {
  if (window._woopriceman.translations.hasOwnProperty(text)) {
    return window._woopriceman.translations[text];
  }

  return text;
};

export default __;
