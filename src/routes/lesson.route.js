import { Router } from "express";
import {
  deleteLesson,
  getAllLessons,
  getSingleLesson,
  lessonAdd,
  updateLesson,
} from "../controllers/lesson.controller.js";

const router = Router();

router.route("").post(lessonAdd);
router.route("").get(getAllLessons);
router.route("/:id").get(getSingleLesson);
router.route("/:id").delete(deleteLesson);
router.route("/:id").patch(updateLesson);

export default router;
