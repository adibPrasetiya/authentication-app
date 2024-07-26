import { config } from "dotenv";

config();

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const APP_PORT = process.env.APP_PORT;
export const KEYCLOAK_ENDPOINT = process.env.KEYCLOAK_ENDPOINT;
export const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
