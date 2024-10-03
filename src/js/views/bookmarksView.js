import icons from 'url:../../img/icons.svg';
import View from './view.js';
import PreviewView from './previewView.js';
class bookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks Available yet! Try Searching For new Recipe:)';
}
export default new bookmarksView();
