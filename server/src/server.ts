import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("홈");
})



app.listen(8000);