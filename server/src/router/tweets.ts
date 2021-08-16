import express from "express";
import "express-async-errors";

let tweets = [
  {
    id: "1",
    text: "얍ㅑ얍ㅑ",
    createAt: Date.now().toString(),
    name: "Duddlf",
    username: "duddlf",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png"
  },
  {
    id: "2",
    text: "끼엿",
    createAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png"
  }
]

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  console.log(req.query)
  console.log(username);
  const data = username ? tweets.filter((tweet) => tweet.username === username) : tweets
  res.status(200).json(data);
})

// GET /tweets/:id
router.get("/:id", (req, res ,next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({message: `TweetID(${id}) is not found`});
  }
})

// POST /tweets
router.post("/", (req, res, next) => {
  const {text, username, name} = req.body;
  const tweet = {
    id: Date.now().toString()+"1",
    text:text,
    name: name,
    username: username,
    createAt: Date.now().toString(),
    url: "임시"
  }
  tweets = [tweet, ...tweets]
  res.status(201).json(tweet);
})

// PUT /tweets/:id
router.put("/:id",(req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json({message: "success"})
  } else {
    res.status(404).json({message: `TweetID(${id}) is not found`});
  }
})

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.sendStatus(204);
})

export default router;