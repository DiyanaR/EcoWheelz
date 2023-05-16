"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv");
const { Client } = require("pg");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
// import { v4 as uuidv4 } from "uuid";
dotenv.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const client = new Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
});
client.connect();
const createTokensTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield `
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title INTEGER,
  subtitle INTEGER,
  price NUMERIC,
  description TEXT
)
`;
    }
    catch (error) {
        console.error("Error creating tokens table:", error);
    }
});
const products = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
INSERT INTO products (id, title, subtitle, description, price)
        VALUES (1, 'E2S', 'Ecowheelz', Our flagship model of electric scooter offers the perfect balance between power and maneuverability, making it the ideal choice for those seeking a powerful yet flexible ride.', 9.999 )`;
        yield client.query(query);
        console.log("success");
    }
    catch (error) {
        console.error("fail");
    }
});
const { rows } = await client.query("SELECT * FROM products");
createTokensTable();
products();
app.listen(8081, () => {
    console.log("port 8081");
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(req.body.user);
}));
