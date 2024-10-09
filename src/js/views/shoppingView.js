import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import View from './view.js';
class ShoppingView extends View {
  _parentElement = document.querySelector('.shopping__cart');
  _data;
  _errorMessage = 'No Items yet. Find a nice recipe! :)';

  // _updateShoppingClick(handeler) {
  //   this._parentElement.addEventListener('click', handeler);
  // }
  _initSearchList(rec, info) {
    return `<li class="preview">
        <a class="preview__link" href="#${info.id}">
          <figure class="preview__fig">
            <img src="${info.image}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.description}</h4>
            <p class="preview__publisher">${info.publisher}</p>
      <div class="preview__user-generated ${info.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
          </div>
        </a>
      </li>`;
  }

  _generateMarkUps(rec) {
    if (!rec || (Array.isArray(rec) && !rec.length)) this._renderErrorMsg();
    return this._data.map(rec => {
      const ingredients = rec.ingredients;
      return ingredients.map(ing => this._initSearchList(ing, rec)).join('');
    });
  }
}

export default new ShoppingView();
