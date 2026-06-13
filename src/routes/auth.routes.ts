import express from "express";
import {
  registerController,
  signInController,
  getUserDetailsController,
} from "../controllers/auth.controller";
import bodyValidator from "../middleware/validators/body.validator";
import { authValidator } from "../middleware/validators/auth.validator";
import authGuard from "../middleware/authentication.middleware";

const router = express.Router();

router.post("/register", bodyValidator, authValidator, registerController);
router.post("/signin", bodyValidator, authValidator, signInController);

router.use(authGuard);
router.get("/me", getUserDetailsController);

export default router;
