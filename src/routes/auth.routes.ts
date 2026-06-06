import express from "express";
import {
  registerController,
  signInController,
} from "../controllers/auth.controller";
import bodyValidator from "../middleware/validators/body.validator";
import { authValidator } from "../middleware/validators/auth.validator";

const router = express.Router();

router.post("/register", bodyValidator, authValidator, registerController);
router.post("/signin", bodyValidator, authValidator, signInController);

export default router;
