import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as authController from "../controller/auth";
import { isAuth } from "../middleware/auth";
import { validate } from "../middleware/validator";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({min:5})
    .withMessage("password should be at least 5 characters"),
    validate,
]

const  vallidateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invaild email"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({nullable:true, checkFalsy: true}),
  validate,
]

//POST /signup
router.post("/signup", authController.signup);
//POST /login
router.post("/login", authController.login);

router.get("/me", isAuth, authController.me);

export default router;