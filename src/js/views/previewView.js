import icons from 'url:../../img/icons.svg';
import View from './view.js';
export default class PreviewView extends View {
  _initSearchList(rec) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
        <a class="preview__link ${
          id === rec.id ? 'preview__link--active' : ''
        }" href="#${rec.id}">
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
