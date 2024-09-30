import icons from 'url:../../img/icons.svg';
import View from './view.js';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'The Required Recipe Does not Exist! Try Another One Until It Prepared For Your Eyes:)';

  _initSearchList(rec) {
    return `<li class="preview">
        <a class="preview__link" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
          </div>
        </a>
      </li>`;
  }

  _generateMarkUps(rec) {
    if (!rec || (Array.isArray(rec) && !rec.length)) this._renderErrorMsg();
    return this._data.map(rec => this._initSearchList(rec)).join('');
  }
}
export default new ResultsView();
