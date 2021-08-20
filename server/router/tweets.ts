import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet";
import { validate } from "../middleware/validator";

const router = express.Router();
const validateTweet = [
  body("text")
  .trim()
  .isLength({min:3})
  .withMessage("text 3글자 이상"),
  validate
  
];

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets)

// GET /tweets/:id
router.get("/:id", tweetController.getTweet)

// POST /tweets
router.post("/", 
  validateTweet,
  tweetController.createTweet)

// PUT /tweets/:id
router.put("/:id",validateTweet, tweetController.updateTweet)

// DELETE /tweets/:id
router.delete("/:id",tweetController.removeTweet)

export default router;