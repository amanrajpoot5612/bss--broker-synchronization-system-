import dotenv from "dotenv";
import path from "path";

// dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config();

export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
export const REQUEST_TOKEN = process.env.REQUEST_TOKEN;

console.log("✅ Secrets loaded:", { API_KEY, REQUEST_TOKEN, API_SECRET });
