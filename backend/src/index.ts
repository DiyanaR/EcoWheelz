import express, { Request, Response } from "express";
const dotenv = require("dotenv");
const { Client } = require("pg");
const app = express();
import cors from "cors";
// import { v4: uuidv4 } from "uuid";
const path = require("path");

dotenv.config();

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
});

client.connect();

app.use(cors());
app.use(express.json());
console.log(path.join(__dirname, "images"));
app.use(express.static(path.join(__dirname, "../images")));

const createUserTable = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

const createTokensTable = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        token TEXT UNIQUE,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
  } catch (error) {
    console.error("Error creating tokens table:", error);
  }
};

const createProductsTable = async () => {
  try {
    await client.query(`
CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  price NUMERIC,
  description TEXT,
  img TEXT
)
`);
  } catch (error) {
    console.error("Error creating tokens table:", error);
  }
};

createTokensTable();
createUserTable();
createProductsTable();

const products = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'E2S', 'Ecowheelz', 'Our flagship model of electric scooter offers the perfect balance between power and maneuverability, making it the ideal choice for those seeking a powerful yet flexible ride.', 9.999 )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};
products();

const products1 = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'E2S Lite', 'Ecowheelz', 'Our E2S Lite electronic scooter boasts not only a lightweight design but also one of the most powerful motors available.', 7.499 )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};
products1();

const products2 = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'E2S BP+', 'Ecowheelz', 'Despite its sleek design, this electric scooter offers one of our best battery times. Its powerful performance is matched by its impressive energy efficiency.', 11.999  )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};
products2();

const products3 = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'E2S Cruiser', 'Ecowheelz', 'Featuring a comfortable saddle, this electric scooter offers the perfect blend of adventure and relaxation. Experience the thrill of the ride without sacrificing comfort.', 12.999 )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};
products3();

const products4 = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'E2S BP+', 'Ecowheelz', 'Despite its sleek design, this electric scooter offers one of our best battery times. Its powerful performance is matched by its impressive energy efficiency.', 11.999 )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};
products4();

const products5 = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'Urban helmet', 'Ecowheelz', 'Introducing TurboCharge helmet for electric scooters, the pinnacle of protection and comfort. Crafted with a robust carbon fiber composite shell.', 599 )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};
products5();

const products6 = async () => {
  try {
    const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'Sport helmet', 'Ecowheelz', 'Sport helmet is an aerodynamic and lightweight helmet that is ideal for sports cycling. It has a hard outer shell in carbon fiber composite.', 899 )`;
    await client.query(query);
    console.log("success");
  } catch (error) {
    console.error("fail");
  }
};
products6();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});

const authorize = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token =
    req.headers?.authorization?.replace("Bearer ", "") ||
    req.body.headers?.Authorization?.replace("Bearer ", "");

  // Check if header has a authorization token
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Check if token exists
    const validationToken = (
      await client.query("SELECT * FROM tokens WHERE token = $1", [token])
    ).rows;

    if (validationToken?.length === 0) {
      return res.status(401).send("Unauthorized");
    }

    console.log(validationToken[0].user_id);

    const user = (
      await client.query("SELECT * FROM users WHERE id = $1", [
        validationToken[0].user_id,
      ])
    ).rows;

    if (user?.length === 0) {
      return res.status(404).send("User not found");
    }

    // Not 100% what to send along to the next process
    req.body.user = {
      username: user[0].username,
      token: validationToken[0].token,
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

app.get("/users", async (req: express.Request, res: express.Response) => {
  const { rows } = await client.query("SELECT * FROM users");
  res.send(rows);
});

app.post("/signup", async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  // if the information is incomplete
  if (!username || !password) {
    return res.status(400).send("Bad request");
  }

  try {
    await client.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );

    res.status(201).json("User successfully created");
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ error: "Username already exists" });
    } else {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ error: "Internal Server error, Failed to create user" });
    }
  }
});

// app.post("/login", async (req: express.Request, res: express.Response) => {
//   const { username, password } = req.body;

//   // if the information is incomplete
//   if (!username || !password) {
//     return res.status(400).send("Bad request");
//   }

//   try {
//     //Retrieve user information by username
//     const userInfo = (
//       await client.query("SELECT * FROM users WHERE username = $1", [username])
//     ).rows;

//     // if no user is found then userInfo will be undefined
//     if (!userInfo) {
//       return res.status(404).json({ error: "Username doesn't exists" });
//     }

//     //Check if passwords match
//     if (userInfo[0].password !== password) {
//       return res.status(401).json({ error: "Incorrect password" });
//     }

//     //Check if user already has a login token
//     const existingToken = (
//       await client.query("SELECT * FROM tokens WHERE user_id = $1", [
//         userInfo[0].id,
//       ])
//     ).rows;

//     // If it does return the existing token with the username
//     if (existingToken.length !== 0) {
//       res.status(200).json({
//         username: userInfo[0].username,
//         token: existingToken[0].token,
//       });
//     } else {
//       // Else make a new token and return it along with username
//       const newToken = (
//         await client.query(
//           "INSERT INTO tokens (user_id, token) VALUES ($1, $2) RETURNING *",
//           [userInfo[0].id, uuidv4()]
//         )
//       ).rows;

//       console.log(newToken);

//       res.status(201).json({
//         username: userInfo[0].username,
//         token: newToken[0].token,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

app.get("/validate-token", authorize, async (req, res) => {
  res.status(200).send(req.body.user);
});

app.get("/products", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products");
    const products = result.rows;
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
});
