import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "express-async-errors";
import * as userRepository from "../data/auth";


const jwtSecretKey:string = "asd123";
const jwtExpiresInDays:string = "2d";
const bcryptSaltRounds: number = 12;

type User = {
  username: string;
  password: string;
  name: string;
  email: string;
  url: string;
}

export async function signup(req: Request, res: Response) {
  const {username, password, name, email, url}: User = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({message: `${username} already exists`});
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url
  })

  const token = createJwtToken(userId);
  res.status(201).json({token, username});
}

export async function login(req: Request, res: Response) {
  const { username, password }: {username:string, password: string} = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invaild user or password"});
  }
  const isVaildPassword = await bcrypt.compare(password, user.password);
  if (!isVaildPassword) {
    return res.status(401).json({ message: "Invaild user or password"});
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username})
}

export async function me(req: Request, res: Response, next: NextFunction) {
  const user = await userRepository.findById(req.userId);
  if(!user) {
    return res.status(404).json({message: "user not found"});
  }
  return res.status(200).json({ token: req.token, username: user.username});
}

function createJwtToken(id?: string) {
  return jwt.sign({ id }, jwtSecretKey, {expiresIn: jwtExpiresInDays})
}