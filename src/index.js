import { KiteConnect } from "kiteconnect";
import { API_KEY } from "./secret.js";
import tokenData from "../data/token.js";
import { normalizedData } from "./tests/zerodhaTest.js";

async function main() {
    token();
    const kc = new KiteConnect({ api_key: API_KEY,
    access_token: tokenData.access_token
 });
    demoFunctions(kc);
    console.log("Normalized Data from tests/zerodhaTest.js:", normalizedData);
    
}
const token = () => {
    try {
    const access_token = tokenData.access_token;
} catch (error) {
    throw new Error("Access token not found in token data run session.js and generate token.js file");
}
}


// console.log("Using access token:", tokenData.access_token);
const demoFunctions = async (kc) => {
    try {
    const orders = await kc.getOrders();
    console.log("Orders:", orders);
    const positions = await kc.getPositions();
    console.log("Positions:", positions);
    const holdings = await kc.getHoldings();
    console.log("Holdings:", holdings);
} catch (error) {
    console.error("Error fetching data:", error);
}

}


main();
