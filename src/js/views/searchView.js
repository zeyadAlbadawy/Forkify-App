import View from './view.js';
class SearchView extends View {
  _parentElement = document.querySelector('.search__btn');
  _data;
  _errorMessage = 'Try Searching For Different Recipes!!';

  _getInput() {
    const input = document.querySelector('.search__field').value;
    this._clearInput();
    return input;
  }
  _clearInput() {
    document.querySelector('.search__field').value = '';
  }
  _addHandelerSearch(searchResFunc) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      searchResFunc(this._getInput());
    });
  }
}

export default new SearchView();
