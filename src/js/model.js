import { async } from 'regenerator-runtime';
import {
  API_URL,
  RECEPIE_PER_PAGE,
  API_KEY,
  REQUESTED_URL,
  SEARCH_API_KEY,
} from './config.js';
import { getJson, sendJSON } from './helper.js';
import shoppingView from './views/shoppingView.js';
import axios from 'axios'; // Import Axios

export const state = {
  recipe: {},
  searchRecipe: {
    query: '',
    searchResults: [],
    page: 1,
    itemsPerPage: RECEPIE_PER_PAGE,
  },
  bookmarks: [],
  cart: [],
  ingredientsState: [],
};

const createRecipe = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}?key=${API_KEY}`);
    const { recipe } = data.data;
    state.recipe = createRecipe(recipe);
    state.bookmarks.forEach(bookmark => {
      if (bookmark.id === id) state.recipe.bookmarked = true;
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.searchRecipe.query = query;
    // await getTheIdOfRequiredRecipe(query);
    const data = await getJson(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.searchRecipe.searchResults = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
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
  state.bookmarks.push(recipe);
  // Push To carts
  const tempDescription = recipe.ingredients.map(ing => ing.description);
  state.cart.push(...tempDescription);
  /////////////// DESCRIPTION ARRAY /////////////
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  keepLocalStorage();
};

export const deleteBookMark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  shoppingView.render(state.bookmarks);
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
  shoppingView.render(state.bookmarks);
};

export const uploadRecipe = async function (newRecipe) {
  //1) Take the Input Data And Make it similar to the one from API
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        rec =>
          rec[0].replaceAll(' ', '').startsWith('ingredient') && rec[1] !== ''
      )
      .map(ing => {
        const componentOfIng = ing[1].split(',');
        if (componentOfIng.length != 3)
          throw new Error(
            `The Entered Ingredients Are Not Correct ! Try Follow The Correct Ones :)`
          );
        const [quantity, unit, description] = componentOfIng;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      publisher: newRecipe.publisher,
      ingredients,
    };
    const recivedRecipe = await sendJSON(API_URL, recipe);
    // console.log(recivedRecipe);
    state.recipe = createRecipe(recivedRecipe.data.recipe);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getTotalCalories = async function (ingredients) {
  try {
    // Send POST request to analyze recipe
    const data = await getJson(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${SEARCH_API_KEY}`
    );
    let requiredId = data[getRandomNumber(0, data.length - 1)].id;
    const imageURL = await getJson(
      `https://api.spoonacular.com/recipes/${requiredId}/card?apiKey=${SEARCH_API_KEY}`
    );
    state.recipe.imageURL = imageURL;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
