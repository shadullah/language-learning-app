import { Router } from "express";
import { getAllLessons, lessonAdd } from "../controllers/lesson.controller.js";

const router = Router();

router.route("").post(lessonAdd);
router.route("").get(getAllLessons);

export default router;
