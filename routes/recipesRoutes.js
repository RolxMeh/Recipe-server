import express from "express";

import recipesModel from "../models/recipes.js";
import usersModel from "../models/users.js";
import verifyToken from "../middleware/middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await recipesModel.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createRecipe", async (req, res) => {
  const newRecipe = req.body;
  try {
    const response = await recipesModel.create(newRecipe);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.put("/createRecipe", verifyToken, async (req, res) => {
  try {
    const user = await usersModel.findById(req.body.userId);
    const recipeId = await recipesModel.findById(req.body.recipeId);

    user.savedRecipes.push(recipeId);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.log(error);
  }
});

router.get("/savedRecipe/:userId", verifyToken, async (req, res) => {
  try {
    const user = await usersModel.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    console.log(error);
  }
});

router.get("/savedRecipes/:userId", verifyToken, async (req, res) => {
  try {
    const user = await usersModel.findById(req.params.userId);
    const savedRecipes = await recipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.json({ savedRecipes });
  } catch (error) {
    console.log(error);
  }
});
export { router as recipesRoute };
