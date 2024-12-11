import { Router } from "express";
import { vocabAdd } from "../controllers/vocab.controllers.js";

const router = Router();

router.route("").post(vocabAdd);

export default router;
