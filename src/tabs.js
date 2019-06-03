export default {
  init,
};

function init() {
  document.querySelectorAll('[data-tabs]').forEach(tabEl => {
    initTabs(tabEl);
  });
}

function initTabs(tabEl) {
  tabEl.querySelectorAll('[data-tab-buttons] button').forEach(button => {
    button.addEventListener('click', evt => {
      const el = evt.currentTarget;
      const index = Array.from(el.parentNode.children).indexOf(el);
      activateTab(tabEl, index);
    });
  });
}

function activateTab(tabEl, index) {
  const activeBtn = tabEl.querySelector(`[data-tab-buttons] button:nth-child(${index + 1})`);
  const activeContent = tabEl.querySelector(`[data-tab-content] > *:nth-child(${index + 1})`);

  tabEl.querySelectorAll(`[data-tab-buttons] button`).forEach(el => {
    el.classList.remove('is-active');
  });

  tabEl.querySelectorAll(`[data-tab-content] > *`).forEach(el => {
    el.classList.remove('is-active');
  });

  activeBtn.classList.add('is-active');
  activeContent.classList.add('is-active');
}

document.querySelectorAll('[data-tabs]').forEach(tabEl => {
  activateTab(tabEl, 0);
});
