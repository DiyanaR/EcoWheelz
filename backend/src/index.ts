import express, { Request, Response } from "express";
const dotenv = require("dotenv"),
  { Client } = require("pg");
import cors from "cors";

dotenv.config();

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
});

client.connect();

const app = express();
app.use(cors());

app.listen(8081, () => {
  console.log("port 8081");
});

app.get("/", async (req: Request, res: Response) => {
  const { rows } = await client.query("SELECT * FROM cities");
  res.send(rows);
});
