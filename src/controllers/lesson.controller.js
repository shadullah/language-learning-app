import { Lesson } from "../models/lessons.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const lessonAdd = asyncHandler(async (req, res) => {
  const { name, lessonNum } = req.body;

  if ([name, lessonNum].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const createdLesson = await Lesson.create({
    name,
    lessonNum,
  });

  if (!createdLesson) {
    return res.status(500).send({ message: "lesson adding error" });
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdLesson, "lesson created successfully!!"));
});

const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({});

  if (!lessons || lessons.length === 0) {
    throw new ApiError(404, "lesson not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, lessons, "lesson got successfully"));
});

const deleteLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const lesson = await Lesson.findByIdAndDelete(id);

  if (!lesson) {
    throw new ApiError(404, "lesson not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, lesson, "lesson deleted successfully"));
});

const updateLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id not exists");
  }

  const { name, lessonNum } = req.body;
  if ([name, lessonNum].some((field) => field?.trim() === "")) {
    res.send("all fields are required");
  }

  const lesson = await Lesson.findById(id);
  if (lesson.name === name) {
    throw new ApiError(500, "same things cannot be updated");
  }

  if (name) {
    lesson.name = name;
  }

  if (lessonNum) {
    lesson.lessonNum = lessonNum;
  }

  const updateLesson = await lesson.save();

  if (!updateLesson) {
    throw new ApiError(400, "lesson not updated");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateLesson, "Updated lesson successfully"));
});

const getSingleLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id not exists");
  }

  const lesson = await Lesson.findById(id);

  if (!lesson) {
    throw new ApiError(404, "lesson does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, lesson, "lesson fetched successfully"));
});

export {
  lessonAdd,
  getAllLessons,
  deleteLesson,
  updateLesson,
  getSingleLesson,
};
