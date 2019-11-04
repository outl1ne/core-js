export default {
  init,
  openModal,
  closeModal,
  toggleModal,
};

function init() {
  document.querySelectorAll('[data-modal-opener]').forEach(modalOpener => {
    const modalName = modalOpener.dataset.modalOpener;
    initOpenModal(modalName);
  });
  document.querySelectorAll('[data-modal-closer]').forEach(modalOpener => {
    const modalName = modalOpener.dataset.modalCloser;
    initCloseModal(modalName);
  });
  document.querySelectorAll('[data-modal-toggler]').forEach(modalToggler => {
    const modalName = modalToggler.dataset.modalToggler;
    initToggleModal(modalName);
  });
  document.querySelectorAll('[data-modal]').forEach(modal => {
    const modalName = modal.dataset.modal;

    if (modal.dataset.closeOnEsc !== 'false') {
      closeModalOnEsc(modalName);
    }

    if (!modal.dataset.modalOpen) {
      modal.dataset.modalOpen = false;
    }
  });
}

function initOpenModal(modalName) {
  document.querySelectorAll(`[data-modal-opener=${modalName}]`).forEach(modalOpener => {
    modalOpener.addEventListener('click', () => {
      openModal(modalName);
    });
  });
}

function openModal(modalName) {
  if (modalName == null) throw new Error('Please pass a modal name to openModal.');

  const modal = document.querySelector(`[data-modal=${modalName}]`);
  modal.setAttribute('data-modal-open', 'true');
  window.dispatchEvent(
    new CustomEvent('modal:opened', {
      detail: {
        type: 'modal:opened',
        name: modalName,
        modal,
      },
    })
  );
  document.querySelector('html').classList.add(`modal-${modalName}-open`);
}

function initCloseModal(modalName) {
  document.querySelectorAll(`[data-modal-closer=${modalName}]`).forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      closeModal(modalName);
    });
  });
}

function closeModal(modalName) {
  if (modalName == null) throw new Error('Please pass a modal name to closeModal.');
  const modal = document.querySelector(`[data-modal=${modalName}]`);
  window.dispatchEvent(
    new CustomEvent('modal:closed', {
      detail: {
        type: 'modal:closed',
        name: modalName,
        modal,
      },
    })
  );
  modal.setAttribute('data-modal-open', 'false');
  document.querySelector('html').classList.remove(`modal-${modalName}-open`);
}

function initToggleModal(modalName) {
  document.querySelectorAll(`[data-modal-toggler=${modalName}]`).forEach(modalToggler => {
    modalToggler.addEventListener('click', () => {
      toggleModal(modalName);
    });
  });
}

function toggleModal(modalName) {
  if (modalName == null) throw new Error('Please pass a modal name to toggleModal.');
  const modal = document.querySelector(`[data-modal=${modalName}]`);
  if (modal.getAttribute('data-modal-open') === 'true') closeModal(modalName);
  else openModal(modalName);
}

function closeModalOnEsc(modalName) {
  const modal = document.querySelector(`[data-modal=${modalName}]`);
  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeModal(modalName);
    }
  });
}
