import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import View from './view.js';
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'Required Recipe Does Not Exist! Try Another One!';

  _generateMarkUps() {
    return `<figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>

      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>


    
      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
    <button class="btn--round btn--Bookmarked">
          <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this._data.ingredients
      .map(ing => {
        return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? fracty(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
           ${ing.description}
        </div>
      </li>`;
      })
      .join('')}
    </ul>
  </div>




<div class="recipe__directions">
${
  this._data?.imageURL?.url
    ? `  <img
    src="${this._data?.imageURL?.url ? this._data.imageURL.url : ''}" 
    alt="${this._data.title}" 
    class="recipe__img" 
    style="width: 115%; height: 100%; object-fit: cover;" 
  />
    </br>
    </br>
    </br>`
    : ''
}


    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank" >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  _addHandelerRender(loadRecipe) {
    ['load', 'hashchange'].forEach(ev =>
      window.addEventListener(ev, loadRecipe)
    );
  }

  _addHandelerBookMarks(handeler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--Bookmarked');
      if (!btn) return;
      handeler();
    });
  }
  _addHandelerReRender(handelerRerender) {
    this._parentElement.addEventListener('click', function (e) {
      let btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      if (btn.classList.contains('btn--increase-servings'))
        handelerRerender('PLUS');
      if (btn.classList.contains('btn--decrease-servings'))
        handelerRerender('MINUS');
    });
  }
}

export default new RecipeView();
