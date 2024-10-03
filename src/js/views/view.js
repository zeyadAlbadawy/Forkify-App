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

  _update(data) {
    if (!data || (Array.isArray(data) && !data.length)) return;
    this.data = data;
    const newMarkup = this._generateMarkUps(this._data);
    const newDomElements = Array.from(
      document
        .createRange()
        .createContextualFragment(newMarkup)
        .querySelectorAll('*')
    );
    const currDomElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    newDomElements.forEach((newElmnt, i) => {
      const currElmnt = currDomElements[i];
      if (
        !newElmnt.isEqualNode(currElmnt) &&
        newElmnt.firstChild?.nodeValue.trim() !== ''
      )
        currElmnt.textContent = newElmnt.textContent;

      if (!newElmnt.isEqualNode(currElmnt)) {
        Array.from(newElmnt.attributes).forEach(attr => {
          currElmnt.setAttribute(attr.name, attr.value);
        });
      }
    });
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
