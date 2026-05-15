const express = require("express");

const {
  registerController,
  signInController,
} = require("../controllers/auth.controller");

const bodyValidator = require("../middleware/validators/body.validator");
const { authValidator } = require("../middleware/validators/auth.validator");

const router = express.Router();

router.post("/register", bodyValidator, ...authValidator, registerController);
router.post("/signin", bodyValidator, ...authValidator, signInController);

module.exports = router;
