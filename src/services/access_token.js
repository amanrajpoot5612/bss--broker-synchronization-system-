import { KiteConnect } from "kiteconnect";
import { API_KEY } from "../secret.js";
import tokenData from "../../data/token.js";

const kc = new KiteConnect({ api_key: API_KEY });
const access_token = tokenData.access_token;
console.log("Using access token:", access_token);
kc.setAccessToken(access_token);

// Example: fetch profile
const profile = await kc.getProfile();
console.log("Profile:", profile);

// Example: fetch orders
const orders = await kc.getOrders();
console.log("Orders:", orders);
