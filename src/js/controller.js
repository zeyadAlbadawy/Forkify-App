import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
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
    resultsView._update(model.recipesPerPage());
    bookmarksView._update(model.state.bookmarks);
  } catch (err) {
    recipeView._renderErrorMsg();
  }
};

const controlSearchResults = async function (query) {
  try {
    resultsView.loadSpinner();
    if (!query) return;
    model.state.searchRecipe.page = 1;
    await model.loadSearchResults(query);
    ResultsView.render(model.recipesPerPage());
    paginationView.render(model.state.searchRecipe);
  } catch (error) {
    console.log(error);
  }
};

const controlNextPrevBtns = function (actionNeeded) {
  if (actionNeeded === 'next')
    model.state.searchRecipe.page = model.state.searchRecipe.page + 1;
  if (actionNeeded === 'prev')
    model.state.searchRecipe.page = model.state.searchRecipe.page - 1;
  resultsView.render(model.recipesPerPage(model.state.searchRecipe.page));
  paginationView.render(model.state.searchRecipe);
};

const controlServings = function (actionNeeded) {
  // Update the no of serviongs
  let newServings = model.state.recipe.servings;
  if (actionNeeded === 'PLUS') newServings = model.state.recipe.servings + 1;

  if (actionNeeded === 'MINUS') newServings = model.state.recipe.servings - 1;
  if (newServings <= 0) {
    model.state.recipe.servings = 1;
    return;
  }
  model.updateNoOfServings(newServings);
  // re-render the recipe view
  recipeView._update(model.state.recipe);
};

const controlBookMarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  recipeView._update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
recipeView._addHandelerRender(controlRecipes);
searchView._addHandelerSearch(controlSearchResults);
paginationView._addHandelerBtn(controlNextPrevBtns);
recipeView._addHandelerReRender(controlServings);
recipeView._addHandelerBookMarks(controlBookMarks);
