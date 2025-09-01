import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
import { API_KEY, REQUEST_TOKEN, API_SECRET } from "../secret.js";
//API_KEY, REQUEST_TOKEN, API_SECRET
function generateChecksum() {
  console.log("API_KEY:", API_KEY);
console.log("REQUEST_TOKEN:", REQUEST_TOKEN);
console.log("API_SECRET:", API_SECRET);

  const data = API_KEY + REQUEST_TOKEN + API_SECRET;
  let checksum = crypto.createHash("sha256").update(data).digest("hex");
  console.log(checksum);
  
  return checksum;
}

generateChecksum();
