import { Router } from "express";
import {
  AddTutorial,
  deleteTutorial,
  getTutorials,
} from "../controllers/tutorial.controller.js";

const router = Router();

router.route("").post(AddTutorial);
router.route("").get(getTutorials);
router.route("/:id").delete(deleteTutorial);

export default router;
