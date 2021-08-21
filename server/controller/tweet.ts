import {Request,Response,NextFunction} from "express";
import * as tweetRepository from "../data/tweets";

export async function getTweets(req: Request, res: Response, next:NextFunction) {
  const username: string = req.query.username! as string;
  const data = await (username ? tweetRepository.getAllByUsername(username): tweetRepository.getAll()); 
  res.status(200).json(data);
}

export async function getTweet (req: Request, res: Response, next:NextFunction){
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({message: `TweetID(${id}) is not found`});
  }
}

export async function createTweet (req: Request, res: Response, next:NextFunction) {
  const {text, id} = req.body;
  const tweet = await tweetRepository.create(text,id);
  res.status(201).json(tweet);
}
export async function updateTweet (req: Request, res: Response, next:NextFunction){
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json({message: "success"})
  } else {
    res.status(404).json({message: `TweetID(${id}) is not found`});
  }
}

export async function removeTweet (req: Request, res: Response, next:NextFunction){
  const id = req.params.id;
  await tweetRepository.remove(id);
  res.sendStatus(204);
}