import { Lesson } from "../models/lessons.model.js";
import { Vocabulary } from "../models/vocabularies.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const vocabAdd = asyncHandler(async (req, res) => {
  const { word, pronunciation, whenToSay, lessonNo, adminEmail } = req.body;

  if (![word, pronunciation, whenToSay, lessonNo, adminEmail].every(Boolean)) {
    throw new ApiError(400, "All fields are required");
  }

  const lessonExists = await Lesson.findOne({ lessonNum: lessonNo });
  if (!lessonExists) {
    throw new ApiError(404, `Lesson with number ${lessonNo} does not exist`);
  }

  const newVocabulary = await Vocabulary.create({
    word,
    pronunciation,
    whenToSay,
    lessonNo,
    adminEmail,
  });

  if (!newVocabulary) {
    throw new ApiError(500, "Failed to create the vocabulary");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, newVocabulary, "Vocabulary created successfully!")
    );
});

export { vocabAdd };
