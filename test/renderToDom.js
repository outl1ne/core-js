let listeners = [];

const addEventListener = window.addEventListener;

module.exports = function renderToDom(string) {
  // Remove old event listeners before rendering new body
  listeners.forEach(args => window.removeEventListener(...args));

  listeners = [];
  window.addEventListener = (...args) => {
    listeners.push(args);
    addEventListener(...args);
  };
  document.body.className = '';
  document.documentElement.className = '';
  document.body.innerHTML = string;
};
