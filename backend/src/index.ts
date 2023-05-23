import express, { Request, Response } from "express";
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
  shortdescription TEXT,
  longdescription TEXT,
  specification TEXT,
  img TEXT)
`);
  } catch (error) {
    console.error("Error creating tokens table:", error);
  }
};

createTokensTable();
createUserTable();
// createProductsTable();

// const products = async () => {
//   try {
// const query = `
`INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
VALUES ('E2S Cruiser', 'Ecowheelz', 'Featuring a comfortable saddle, this electric scooter offers the perfect blend of adventure and relaxation. Experience the thrill of the ride without sacrificing comfort.', 'E2S Cruiser is the ultimate electric scooter for adventurers who want a little something extra. With a comfortable saddle, you can enjoy a long and relaxing ride while getting the powerful motor and stable tires that E2S models are known for. Additionally, this electric scooter has several useful features, such as an LED display for speed and battery level, strong front and rear lights for safety, and a foldable design for easy storage and transport.',
'Motor: 500W,
Battery: 48V 13Ah lithium-ion,
Range: Up to 50 km per charge,
Max speed: Up to 25 km/h,
Brakes: Disc brakes front and rear,
Tires: Air-filled 10-inch tires,
Weight capacity: Up to 120 kg,
Charging time: Up to 6 hours,
Weight: Approximately 21-22 kg,
Frame: Robust aluminum frame with a comfortable saddle,
Foldable: Yes, foldable in two steps,
Handlebar: Adjustable handlebar with LED display for speed and battery level', 12.999, './images/cruiser.png');`;
//     await client.query(query);
//     console.log("success");
//   } catch (error) {
//     console.error("fail");
//   }
// };
// products();

// const products1 = async () => {
//   try {
// const query = `
`INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
        VALUES ('E2S Lite', 'Ecowheelz', 'Our E2S Lite electronic scooter boasts not only a lightweight design but also one of the most powerful motors available.', 'E2S Lite is an electronic scooter that is lightweight yet powerful. With one of the most powerful motors available, you can easily navigate through the hills and traffic of the city while enjoying the smooth riding experience. This electric scooter is also easy to fold and store, making it the perfect companion for travel or daily commuting',
      'Motor: 350W,
      Battery: 36V 7.8Ah lithium-ion,
      Range: Up to 30 km per charge,
      Max speed: Up to 25 km/h,
      Brakes: Disc brakes front and rear,
      Tires: Air-filled 8-inch tires,
      Weight capacity: Up to 120 kg,
      Charging time: Up to 4 hours,
      Weight: Approximately 13-14 kg,
      Frame: Lightweight and robust aluminum frame,
      Foldable: Yes, foldable in two steps,
      Handlebar: Adjustable handlebar for comfortable ride',  7.499, './images/E2S_Lite.png');`;
//     await client.query(query);
//     console.log("success");
//   } catch (error) {
//     console.error("fail");
//   }
// };
// products1();

// const products2 = async () => {
//   try {
// const query = `
`INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
        VALUES ('E2S BP+', 'Ecowheelz', 'Despite its sleek design, this electric scooter offers one of our best battery times. Its powerful performance is matched by its impressive energy efficiency.', 'E2S BP+ is an electric scooter that combines style and function. With a sleek and elegant design, this electric scooter is perfect for users who want a simple and practical transportation solution. But do not be fooled by its appearance, E2S BP+ also has one of the best battery times in the industry, meaning you can ride longer and faster without worrying about the battery running out. And with a powerful motor and disc brakes for safety, this is an electric scooter that does not sacrifice performance for style.',
      'Motor: 350W,
      Battery: 36V 10.4Ah lithium-ion,
      Range: Up to 40 km per charge,
      Max speed: Up to 25 km/h,
      Brakes: Disc brakes front and rear,
      Tires: Air-filled 8-inch tires,
      Weight capacity: Up to 120 kg,
      Charging time: Up to 5 hours,
      Weight: Approximately 15-16 kg,
      Frame: Sleek and elegant design with an aluminum frame,
      Foldable: Yes, foldable in one step,
      Handlebar: Adjustable handlebar with LED display for speed and battery level', 11.999, './images/E2S_BP.png');`;
//     await client.query(query);
//     console.log("success");
//   } catch (error) {
//     console.error("fail");
//   }
// };
// products2();

// const products3 = async () => {
//   try {
//     const query = `
`INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
        VALUES ('E2S', 'Ecowheelz', 'Featuring a comfortable saddle, this electric scooter offers the perfect blend of adventure and relaxation. Experience the thrill of the ride without sacrificing comfort.','E2S is a flagship model of electric scooter that takes power and maneuverability to a new level. With a powerful motor that makes it easy to climb hills and navigate through city traffic, the E2S is the perfect solution for flexible and fast transportation. Additionally, it has an ergonomic handlebar for a comfortable ride, air-filled tires for a smooth and stable ride, and a robust frame that can withstand demanding use.',  'Motor: 500W,
      Battery: 48V 13Ah lithium-ion,
      Range: Up to 50 km per charge,
      Max speed: Up to 25 km/h,
      Brakes: Disc brakes front and rear,
      Tires: Air-filled 10-inch tires,
      Weight capacity: Up to 120 kg,
      Charging time: Up to 6 hours,
      Weight: Approximately 21-22 kg,
      Frame: Robust aluminum frame with a comfortable saddle,
      Foldable": Yes, foldable in two steps,
      Handlebar: Adjustable handlebar with LED display for speed and battery level',  9.999, './images/E2S.png' );`;
//     await client.query(query);
//     console.log("success");
//   } catch (error) {
//     console.error("fail");
//   }
// };
// products3();

// const products4 = async () => {
//   try {
//     const query = `
// INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
//         VALUES ('Turbo helmet', 'Ecowheelz', 'Despite its sleek design, this electric scooter offers one of our best battery times. Its powerful performance is matched by its impressive energy efficiency.', 11.999, './images/Turbo_helment.png' )`;
//     await client.query(query);
//     console.log("success");
//   } catch (error) {
//     console.error("fail");
//   }
// };
// products4();

// const products5 = async () => {
//   try {
//     const query = `
`INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
        VALUES ('Urban helmet', 'Ecowheelz', 'Introducing TurboCharge helmet for electric scooters, the pinnacle of protection and comfort. Crafted with a robust carbon fiber composite shell.','Experience superior protection and comfort with the TurboCharge helmet for electric scooters. The sturdy carbon fiber composite and foam core provide optimal protection during collisions, while the adjustable fit and air vents keep your head comfortable and cool during long rides', 'Material: Robust carbon fiber composite and foam core,
        Design: Specifically designed for electric scooters,
        Protection: Offers superior protection in case of collisions,
        Comfort: Adjustable fit for enhanced comfort. Air vents to keep the head comfortable and cool during long rides,
        Weight: Approximately 500 grams,
        Durability: Constructed to withstand high speeds and provide long-lasting use, with extra reinforcement for increased safety', 599, './images/Urban_helmet.png' );`;
//     await client.query(query);
//     console.log("success");
//   } catch (error) {
//     console.error("fail");
//   }
// };
// products5();

// const products6 = async () => {
//   try {
//     const query = `
`INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
        VALUES ('Turbo Charge helmet', 'Ecowheelz', 'Introducing TurboCharge helmet for electric scooters, the pinnacle of protection and comfort. Crafted with a robust carbon fiber composite shell.', 'Experience superior protection and comfort with the TurboCharge helmet for electric scooters. The sturdy carbon fiber composite and foam core provide optimal protection during collisions, while the adjustable fit and air vents keep your head comfortable and cool during long rides', 'Material: Robust carbon fiber composite and foam core,
        Design: Specifically designed for electric scooters,
        Protection: Offers superior protection in case of collisions,
        Comfort: Adjustable fit for enhanced comfort. Air vents to keep the head comfortable and cool during long rides,
        Weight: Approximately 500 grams,
        Durability: Constructed to withstand high speeds and provide long-lasting use, with extra reinforcement for increased safety.', 899, './images/Turbo_helmet.png'  );`;
//     await client.query(query);
//     console.log("success");
//   } catch (error) {
//     console.error("fail");
//   }
// };
// products6();

`INSERT INTO products (title, subtitle, shortdescription, longdescription, specification, price, img)
        VALUES ('Sport helmet', 'Ecowheelz', 'Sport helmet is an aerodynamic and lightweight helmet that is ideal for sports cycling. It has a hard outer shell in carbon fiber composite.', 'Experience superior protection and comfort with the Sport helmet for electric scooters. The sturdy carbon fiber composite and foam core provide optimal protection during collisions, while the adjustable fit and air vents keep your head comfortable and cool during long rides', 'Material: Hard outer shell in carbon fiber composite and inner foam core,
        Aerodynamic and lightweight design,
        Provides optimal protection in case of accidents,
        Adjustable strap to ensure a perfect fit,
        Multiple air vents to keep the head cool during intense training sessions,
        Weight: Approximately 250 grams,
        Durability: Designed to meet high demands in electric scooter riding, durable and impact-resistant.', 899, './images/Sport_helmet.png'  );`;

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

app.post("/login", async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  // if the information is incomplete
  if (!username || !password) {
    return res.status(400).send("Bad request");
  }

  try {
    //Retrieve user information by username
    const userInfo = (
      await client.query("SELECT * FROM users WHERE username = $1", [username])
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
        username: userInfo[0].username,
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

      console.log(newToken);

      res.status(201).json({
        username: userInfo[0].username,
        token: newToken[0].token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

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
