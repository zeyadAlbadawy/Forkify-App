import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import resultsView from './views/resultsView.js';
// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Load Spinner
    recipeView.loadSpinner();
    // Load Recipe
    await model.loadRecipe(id);
    // Render The Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView._renderErrorMsg();
  }
};

const controlSearchResults = async function (query) {
  try {
    resultsView.loadSpinner();
    if (!query) return;
    await model.loadSearchResults(query);
    ResultsView.render(model.recipesPerPage());
  } catch (error) {
    console.log(error);
  }
};

recipeView._addHandelerRender(controlRecipes);
searchView._addHandelerSearch(controlSearchResults);
