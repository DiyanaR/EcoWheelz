import express, { Request, Response } from "express";
const dotenv = require("dotenv");
const { Client } = require("pg");
const app = express();
import cors from "cors";
// import { v4 as uuidv4 } from "uuid";

dotenv.config();
app.use(cors());
app.use(express.json());

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
});

client.connect();

const createTokensTable = async () => {
  try {
    await `
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title INTEGER,
  subtitle INTEGER,
  price NUMERIC,
  description TEXT
)
`;
  } catch (error) {
    console.error("Error creating tokens table:", error);
  }
};

const products = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'E2S', 'Ecowheelz', Our flagship model of electric scooter offers the perfect balance between power and maneuverability, making it the ideal choice for those seeking a powerful yet flexible ride.', 9.999 )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};

const { rows } = await client.query("SELECT * FROM products");

createTokensTable();
products();

app.listen(8081, () => {
  console.log("port 8081");
});

app.get("/", async (req, res) => {
  res.status(200).send(req.body.user);
});
