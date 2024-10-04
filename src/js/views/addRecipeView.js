import icons from 'url:../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _message = 'You Recipe Uploaded Successfully!';
  constructor() {
    super();
    this._addHandelerViewForm();
    this._addHandelerHideForm();
    // this._addHandelerGetData();
  }

  _toggleHiddenForm() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandelerViewForm() {
    this._btnOpen.addEventListener('click', this._toggleHiddenForm.bind(this));
  }

  _addHandelerHideForm() {
    this._btnClose.addEventListener('click', this._toggleHiddenForm.bind(this));
    this._overlay.addEventListener('click', this._toggleHiddenForm.bind(this));
  }

  _addHandelerGetData(handeler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handeler(data);
    });
  }
}

export default new AddRecipeView();
