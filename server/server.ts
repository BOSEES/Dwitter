import express, {ErrorRequestHandler, Request, Response, NextFunction} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import tweetRoute from "./router/tweets";
import authRoute from "./router/auth";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use("/tweets", tweetRoute);
app.use("/auth", authRoute);

app.use((error:ErrorRequestHandler,req: Request,res: Response,next: NextFunction) => {
  res.status(404).json({message: "404 Not Found"});
})


app.listen(8000, () => {
  console.log("서버 가동");
});