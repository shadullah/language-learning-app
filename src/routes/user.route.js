import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  singleUser,
  userUpdate,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("").get(getAllUsers);
router.route("/:id").get(singleUser);
router.route("/:id").patch(userUpdate);

export default router;
