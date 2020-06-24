const express = require('express')

const RecipeCtrl = require('../controllers/recipe-ctrl')

const router = express.Router()

router.post('/recipe', RecipeCtrl.createRecipe)
router.patch('/recipe/:id', RecipeCtrl.updateRecipe)
router.delete('/recipe/:id', RecipeCtrl.deleteRecipe)
router.get('/recipe/:id', RecipeCtrl.getRecipeById)
router.get('/recipes', RecipeCtrl.getRecipes)

module.exports = router

//changed .patch