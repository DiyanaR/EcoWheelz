import express, { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
const { Client } = require("pg");
const app = express();
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
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
// app.use("/", express.static(path.join(__dirname, "public"));
app.use("/images", express.static(path.join(__dirname, "../images")));

console.log(path.join(path.resolve(), "public"));

app.use(express.static(path.join(path.resolve(), "public")));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});

const authorize = async (req: Request, res: Response, next: NextFunction) => {
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

    const user = (
      await client.query("SELECT * FROM users WHERE id = $1", [
        validationToken[0].user_id,
      ])
    ).rows;

    if (user?.length === 0) {
      return res.status(404).send("User not found");
    }

    req.body.user = {
      id: user[0].id,
      email: user[0].email,
      firstName: user[0].firstname,
      lastName: user[0].lastname,
      token: validationToken[0].token,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

app.get("/users", async (req: Request, res: Response) => {
  const { rows } = await client.query("SELECT * FROM users");
  res.send(rows);
});

app.post("/signup", async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  // if the information is incomplete
  if (!email || !password || !firstName || !lastName || !phoneNumber) {
    return res.status(400).send("Bad request");
  }

  try {
    await client.query(
      "INSERT INTO users (email, password, firstName, lastName, phoneNumber) VALUES ($1, $2, $3, $4, $5)",
      [email.toLowerCase(), password, firstName, lastName, phoneNumber]
    );

    res.status(201).json("User successfully created");
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ error: "email already exists" });
    } else {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ error: "Internal Server error, Failed to create user" });
    }
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // if the information is incomplete
  if (!email || !password) {
    return res.status(400).send("Bad request");
  }

  try {
    //Retrieve user information by email
    const userInfo = (
      await client.query("SELECT * FROM users WHERE email = $1", [
        email.toLowerCase(),
      ])
    ).rows;

    // if no user is found then userInfo will be undefined
    if (!userInfo) {
      return res.status(404).json({ error: "Username doesn't exists" });
    }

    //Check if passwords match
    if (userInfo[0].password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    //Check if user already has a login token
    const existingToken = (
      await client.query("SELECT * FROM tokens WHERE user_id = $1", [
        userInfo[0].id,
      ])
    ).rows;

    // If it does return the existing token with the username
    if (existingToken.length !== 0) {
      res.status(200).json({
        email: userInfo[0].email,
        token: existingToken[0].token,
      });
    } else {
      // Else make a new token and return it along with username
      const newToken = (
        await client.query(
          "INSERT INTO tokens (user_id, token) VALUES ($1, $2) RETURNING *",
          [userInfo[0].id, uuidv4()]
        )
      ).rows;

      res.status(201).json({
        email: userInfo[0].email,
        firstName: userInfo[0].firstName,
        lastName: userInfo[0].lastName,
        token: newToken[0].token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout", authorize, async (req: Request, res: Response) => {
  const { token } = req.body.user;

  try {
    await client.query("DELETE FROM tokens WHERE token = $1", [token]);

    res.status(200).send("User Logged out");
  } catch (error) {
    console.log(error);
  }
});

app.get("/validate-email", async (req, res) => {
  const { email } = req.query;

  try {
    if (email) {
      const checkExistingEmail = (
        await client.query("SELECT * FROM users WHERE email = $1", [email])
      ).rows;

      res.status(200).json(checkExistingEmail.length);
    } else res.status(400).send({ error: "Bad request" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/validate-token", authorize, async (req, res) => {
  res.status(200).send(req.body.user);
});

interface orderInformation {
  orderId: number;
  quantity: number;
}

interface orderType {
  productOrders: orderInformation[];
  total: number;
}

app.post("/order", authorize, async (req, res) => {
  const { id } = req.body.user;
  const { productOrders, total }: orderType = req.body.data;

  // Check for valid data
  if (!productOrders || productOrders.length === 0 || !total) {
    return res.status(400).send({ error: "Bad request" });
  }

  //Rrtrieve data for product verification
  const validateProducts = await client.query(
    "SELECT * FROM products WHERE id = ANY($1)",
    [productOrders.map((order) => order.orderId)]
  ).rows;

  // fail the request if one or more products are missing
  if (validateProducts.length !== productOrders.length) {
    return res.status(400).send({ error: "Bad request" });
  }

  try {
    await client.query("BEGIN");

    await client.query("");

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    res
      .status(500)
      .send({ error: "Internal server error, couldn't finish transaction" });
  }

  console.log(validateProducts);

  res.end();
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

// app.get("/search", async (req: Request, res: Response) => {
//   const searchQuery = req.query.search;

//   try {
//     const result = await client.query(
//       "SELECT * FROM products WHERE name ILIKE $1",
//       [`%${searchQuery}%`]
//     );
//     const products = result.rows;
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching products" });
//   }
// });

app.get("/products/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const { rows } = await client.query(
      "SELECT * FROM products WHERE title = $1",
      [title]
    );
    const product = rows[0];

    if (product) {
      res.json([product]);
    } else {
      res.status(404).json({ error: "Produkten hittades inte" });
    }
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({ error: "fel inträffade vid hämtning av produkten" });
  }
});
