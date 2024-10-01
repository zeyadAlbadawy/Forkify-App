import icons from 'url:../../img/icons.svg';
import View from './view.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _renderPrevBtn(currPage) {
    return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>`;
  }

  _renderNextBtn(currPage) {
    return `<button class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generateMarkUps() {
    const currPage = this._data.page;
    const noOfPages = Math.ceil(
      this._data.searchResults.length / this._data.itemsPerPage
    );
    // 1) we are on the first page and there are  other pages
    if (currPage === 1 && noOfPages > 1) return this._renderNextBtn(currPage);
    // 2) We Are at the last page
    if (currPage === noOfPages && noOfPages > 1)
      return this._renderPrevBtn(currPage);

    // 4) On the first page and there is no pages
    if (currPage === 1 && noOfPages === 1) return '';

    // 3) we are at the middle of pages
    const prevBtn = this._renderPrevBtn(currPage);
    const nextBtn = this._renderNextBtn(currPage);
    return prevBtn + nextBtn; // Combine both results and return
  }

  _addHandelerBtn(handeler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.classList.contains('pagination__btn--next')) handeler('next');
      else handeler('prev');
    });
  }
}

export default new PaginationView();
