import icons from 'url:../../img/icons.svg';
import View from './view.js';
import PreviewView from './previewView.js';
class bookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks Available yet! Try Searching For new Recipe:)';

  _updateHandeler(handeler) {
    window.addEventListener('load', handeler);
  }
}

export default new bookmarksView();
