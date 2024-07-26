import session from "express-session";
import { Issuer } from "openid-client";
import {
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_ENDPOINT,
} from "../configs/constanta-config.js";

let client;

export const memoryStore = new session.MemoryStore();

export const configureOIDC = async () => {
  const keycloakIssuer = await Issuer.discover(KEYCLOAK_ENDPOINT);
  client = new keycloakIssuer.Client({
    client_id: "authenticate-app",
    client_secret: KEYCLOAK_CLIENT_SECRET,
    redirect_uris: ["http://localhost:3000/auth/callback"],
    response_types: ["code"],
  });
};

export const getClient = () => {
  return client;
};
