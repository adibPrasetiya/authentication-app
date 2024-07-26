import { Router } from "express";
import userController from "../controllers/user-controller.js";

export const publicRoute = Router();

publicRoute.get("/auth/register", userController.getRegistration);
publicRoute.post("/auth/register", userController.postRegistration);

// kita ganti routing ke dengan controller yang sudah kita buat
// publicRoute.get("/auth/login", userController.getLogin);
// publicRoute.post("/auth/login", userController.postLogin);

publicRoute.get("/auth/login", userController.getLoginWithKeycloak);
publicRoute.get("/auth/callback", userController.loginCallback);
