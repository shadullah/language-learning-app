import { Tutorial } from "../models/tutorials.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const AddTutorial = asyncHandler(async (req, res) => {
  const { name, link, email } = req.body;

  if ([name, link, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User with this email not found" });
  }

  const createdTutorial = await Tutorial.create({
    name,
    link,
    email: user._id,
  });

  if (!createdTutorial) {
    return res.status(500).send({ message: "tutorial adding error" });
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdTutorial, "User created successfully!!"));
});

const getTutorials = asyncHandler(async (req, res) => {
  const tutorials = await Tutorial.find({});

  if (!tutorials || tutorials.length === 0) {
    throw new ApiError(404, "tutorial not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tutorials, "tutorial got successfully"));
});

const deleteTutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tutorial = await Tutorial.findByIdAndDelete(id);

  if (!tutorial) {
    throw new ApiError(404, "tutorial not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tutorial, "tutorial deleted successfully"));
});

export { AddTutorial, getTutorials, deleteTutorial };
