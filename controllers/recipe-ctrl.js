const Recipe = require("../models/recipe-model");
const fs = require("fs");

createRecipe = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a recipe",
    });
  }

  const recipe = new Recipe(body);

  if (!recipe) {
    return res.status(400).json({ success: false, error: err });
  }

  recipe
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: recipe._id,
        message: "Recipe created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Recipe not created!",
      });
    });
};

updateRecipe = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.json({
        err,
        message: "Recipe not found!",
      });
    }
    recipe.title = body.title;
    recipe.description = body.description;
    recipe.ingredients = body.ingredients;
    recipe.methods = body.methods;
    recipe.id = body.id;
    recipe.fileName = body.fileName;
    recipe
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: recipe._id,
          message: "Recipe updated!",
          recipe: recipe,
        });
      })
      .catch((error) => {
        return res.json({
          error,
          message: "Recipe not updated!",
        });
      });
  });
};

deleteRecipe = async (req, res) => {
  deletePhoto(req);
  await Recipe.findOneAndDelete({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!recipe) {
      return res.json({ success: false, error: `Recipe not found` });
    }

    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

getRecipeById = async (req, res) => {
  await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: `Recipe not found` });
    }
    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

getRecipes = async (req, res) => {
  await Recipe.find({}, (err, recipes) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!recipes.length) {
      return res
        .status(404)
        .json({ success: false, error: `Recipe not found` });
    }
    return res.status(200).json({ success: true, data: recipes });
  }).catch((err) => console.log(err));
};

//HERE is where I should delete the file in google cloud... but setting up permissions sounds very time consuming
// I solution is to give the photo a userId property on upload, then when making the delete request check if the ids match

// deletePhoto = async (req) => {
//   await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
//     if (recipe.fileName) {
//       console.log(recipe);
//       const fileName = recipe.fileName;
//       const pathToFile = `/Users/oskarwroz/Documents/WebDev-Projects/recipe-share-app/recipe-share/public/uploads/${fileName}`;

//       fs.unlink(pathToFile, function (err) {
//           if (err) {
//               throw err
//           } else {
//               console.log("Successfully deleted the file.")
//           }
//       })
//     }
//     console.log("No issues...");
//   });
// };

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
};
