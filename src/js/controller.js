import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import { POP_UP_SEC } from './config.js';
import addRecipeView from './views/addRecipeView.js';
import shoppingView from './views/shoppingView.js';
// import { set } from 'core-js/core/dict';
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

    // const finalIngregients = [];
    // model.state.recipe.ingredients.forEach(ing => {
    //   let splittedOne = ing.description.split(' ');
    //   finalIngregients.push(splittedOne[splittedOne.length - 1]);
    // });
    model.state.recipe.ingredients.forEach(ing => {
      let splittedOne = ing.description.split(' ');
      model.state.ingredientsState.push(splittedOne[splittedOne.length - 1]);
    });

    // Get The Similar Recipes =>>
    await model.getTotalCalories(
      model.state.ingredientsState.length > 10
        ? model.state.ingredientsState.slice(0, 10)
        : model.state.ingredientsState
    );

    console.log(model.state.ingredientsState);
    model.state.ingredientsState = [];
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
    // console.log(error);
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
  shoppingView.render(model.state.bookmarks);
};

const handlerForBookmarks = function () {
  model.reRenderTheBookmarks();
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipes = async function (data) {
  try {
    await model.uploadRecipe(data);
    recipeView.render(model.state.recipe);
    addRecipeView._renderMsg();
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // setTimeout(() => {
    //   addRecipeView._toggleHiddenForm();
    // }, POP_UP_SEC);
  } catch (err) {
    addRecipeView._renderErrorMsg(err.message);
  }
};

const controlShoppingCart = function () {};

recipeView._addHandelerRender(controlRecipes);
searchView._addHandelerSearch(controlSearchResults);
paginationView._addHandelerBtn(controlNextPrevBtns);
recipeView._addHandelerReRender(controlServings);
recipeView._addHandelerBookMarks(controlBookMarks);
bookmarksView._updateHandeler(handlerForBookmarks);
addRecipeView._addHandelerGetData(controlAddRecipes);
// shoppingView._updateShoppingClick(controlShoppingCart);
