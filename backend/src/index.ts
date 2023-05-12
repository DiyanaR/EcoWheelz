import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(8080, () => {
  console.log("port 8080");
});

app.get("/", (req: Request, res: Response) => {
  res.send("teeeeest!");
});
