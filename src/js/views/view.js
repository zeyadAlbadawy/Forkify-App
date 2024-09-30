import icons from 'url:../../img/icons.svg';
export default class View {
  render(data) {
    this._data = data;
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateMarkUps(this._data)
    );
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  loadSpinner() {
    this._clear();
    const spinnerCreation = `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerCreation);
  }
  _renderErrorMsg(message = this._errorMessage) {
    const markUp = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
