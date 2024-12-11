import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lessonNum: {
      type: Number,
      required: true,
      unique: true,
    },
    vocabularyCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

lessonSchema.pre("save", async function (next) {
  const vocab = mongoose.model("Vocabulary");
  const count = await vocab.countDocuments({ lessonNo: this.lessonNum });
  this.vocabularyCount = count;
  next();
});

export const Lesson = mongoose.model("Lesson", lessonSchema);
