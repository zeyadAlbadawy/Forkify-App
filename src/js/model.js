import { async } from 'regenerator-runtime';
import { API_URL, RECEPIE_PER_PAGE } from './config.js';
import { getJson } from './helper.js';

export const state = {
  recipe: {},
  searchRecipe: {
    query: '',
    searchResults: [],
    page: 1,
    itemsPerPage: RECEPIE_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      bookmarked: false,
    };

    state.bookmarks.forEach(bookmark => {
      if (bookmark.id === id) state.recipe.bookmarked = true;
    });
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.searchRecipe.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    state.searchRecipe.searchResults = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const recipesPerPage = function (page = state.searchRecipe.page) {
  state.searchRecipe.page = page;
  const start = (page - 1) * RECEPIE_PER_PAGE;
  const end = page * RECEPIE_PER_PAGE;
  return state.searchRecipe.searchResults.slice(start, end);
};

export const updateNoOfServings = function (noOfServings) {
  state.recipe.ingredients.forEach(
    ing =>
      (ing.quantity = (ing.quantity * noOfServings) / state.recipe.servings)
  );
  state.recipe.servings = noOfServings;
};

export const addBookMark = function (recipe) {
  // Add The Recipe to the bookmarks
  // Check if the required recipe is bookmarked before
  console.log();
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  keepLocalStorage();
};

export const deleteBookMark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  keepLocalStorage();
};

const keepLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const reRenderTheBookmarks = function () {
  if (!localStorage.getItem('bookmarks')) return;
  JSON.parse(localStorage.getItem('bookmarks')).forEach(bookmark => {
    addBookMark(bookmark);
  });
};
