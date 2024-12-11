import { Router } from "express";
import {
  deleteVocab,
  getAllVocabs,
  vocabAdd,
} from "../controllers/vocab.controllers.js";

const router = Router();

router.route("").post(vocabAdd);
router.route("").get(getAllVocabs);
router.route("/:id").delete(deleteVocab);

export default router;
