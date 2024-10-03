import icons from 'url:../../img/icons.svg';
import View from './view.js';
import PreviewView from './previewView.js';

class ResultsView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'The Required Recipe Does not Exist! Try Another One Until It Prepared For Your Eyes:)';
}
export default new ResultsView();
