import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRoute } from "../routes/userRoute.js";
import { recipesRoute } from "../routes/recipesRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Roland90:Ogeleayo90@recipe.c1hhwvt.mongodb.net/Recipe?retryWrites=true&w=majority"
);

app.use("/auth", userRoute);
app.use("/recipes", recipesRoute);

app.listen(port, () =>
  console.log(`Server started, listening on port ${port}`)
);
