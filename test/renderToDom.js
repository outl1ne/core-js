module.exports = function renderToDom(string) {
  document.body.className = '';
  document.documentElement.className = '';
  document.body.innerHTML = string;
};
