import mongoose from "mongoose";

const recipesSchema = mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instruction: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const recipesModel = mongoose.model("recipes", recipesSchema);

export default recipesModel;
