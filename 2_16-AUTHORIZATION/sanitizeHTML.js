const sanitizeHtml = htmlString => {
  return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

export default sanitizeHtml;