import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqruired: true,
    },
  },
  { timestamps: true }
);

export const Tutorial = mongoose.model("Tutorial", tutorialSchema);
