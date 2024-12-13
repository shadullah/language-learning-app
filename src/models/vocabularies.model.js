import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true,
    },
    pronunciation: {
      type: String,
      required: true,
      trim: true,
    },
    whenToSay: {
      type: String,
      required: true,
      trim: true,
    },
    lessonNo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Lesson",
    },
    adminEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

vocabularySchema.post("save", async function (doc) {
  const Lesson = mongoose.model("Lesson");
  await Lesson.updateOne(
    { lessonNum: doc.lessonNo },
    { $inc: { vocabularyCount: 1 } }
  );
});

vocabularySchema.post("remove", async function (doc) {
  const Lesson = mongoose.model("Lesson");
  await Lesson.updateOne(
    { lessonNum: doc.lessonNo },
    { $inc: { vocabularyCount: -1 } }
  );
});

export const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
