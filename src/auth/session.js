import crypto from "crypto";
import fetch from "node-fetch";
import dotenv from "dotenv";

// 1) Load .env file
dotenv.config();

// import { API_KEY, API_SECRET, REQUEST_TOKEN } from '../secret.js';
const API_KEY = process.env.API_KEY;
const REQUEST_TOKEN = process.env.REQUEST_TOKEN;
const API_SECRET = process.env.API_SECRET;
console.log(API_KEY, REQUEST_TOKEN, API_SECRET);


// 2) Generate checksum
function generateChecksum(apiKey, requestToken, apiSecret) {
  if (!apiKey || !requestToken || !apiSecret) {
    throw new Error(
      `❌ Missing env vars:
       API_KEY=${apiKey},
       REQUEST_TOKEN=${requestToken},
       API_SECRET=${apiSecret}`
    );
  }

  const data = apiKey + requestToken + apiSecret;
  return crypto.createHash("sha256").update(data, "utf8").digest("hex");
}

// 3) Exchange request_token → access_token
async function getAccessToken() {
  const checksum = generateChecksum(API_KEY, REQUEST_TOKEN, API_SECRET);

  const response = await fetch("https://api.kite.trade/session/token", {
    method: "POST",
    headers: {
      "X-Kite-Version": "3",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      api_key: API_KEY,
      request_token: REQUEST_TOKEN,
      checksum: checksum,
    }),
  });

  const data = await response.json();
  return data;
}

// 4) Run
getAccessToken()
  .then((data) => {
    console.log("✅ Session response:", JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
  });
