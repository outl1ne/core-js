export default {
  init,
};

function init() {
  document.querySelectorAll('[data-tabs]').forEach(tabEl => {
    initTabs(tabEl);
  });
}

function initTabs(tabEl) {
  let initialActiveTabSet = false;
  tabEl.querySelectorAll('[data-tab-buttons] button').forEach(button => {
    button.addEventListener('click', evt => {
      const el = evt.currentTarget;
      const index = Array.from(el.parentNode.children).indexOf(el);
      activateTab(tabEl, index);
    });
    if (button.classList.contains('is-active')) initialActiveTabSet = true;
  });
  if (initialActiveTabSet === false) {
    tabEl.querySelector('[data-tab-buttons] button').classList.add('is-active');
    tabEl.querySelector('[data-tab-content] > *').classList.add('is-active');
  }
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
