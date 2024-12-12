import { Router } from "express";
import {
  deleteVocab,
  getAllVocabs,
  updatedVocab,
  vocabAdd,
} from "../controllers/vocab.controllers.js";

const router = Router();

router.route("").post(vocabAdd);
router.route("").get(getAllVocabs);
router.route("/:id").delete(deleteVocab);
router.route("/:id").patch(updatedVocab);

export default router;
