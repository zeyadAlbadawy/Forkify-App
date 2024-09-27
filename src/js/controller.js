import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  // Load Spinner
  recipeView.loadSpinner();
  // Load Recipe
  await model.loadRecipe(id);

  // Render The Recipe
  recipeView.render(model.state.recipe);
};

['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
