import express from 'express';
import ViteExpress from 'vite-express';
import { Ingredient, Author, Recipe, Recipe_Ingredient } from './models/model.js';

// INITIALIZE
const app = express();

// MIDDLE-WARE
app.use(express.json());

// ROUTES
app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.findAll();

  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    let recipeIngredientsArray = await recipe.getRecipeIngredients();
    console.log(recipeIngredientsArray);
  }

  res.status(200).send({
    recipes: recipes,
    message: 'recipes biiiiitch',
  });
});

// LISTEN
ViteExpress.listen(app, 8372, () => {
  console.log('app is up on 8372');
});
