import { config } from "dotenv";

config();

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const APP_PORT = process.env.APP_PORT;
