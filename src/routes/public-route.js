import { Router } from "express";
import userController from "../controllers/user-controller.js";

export const publicRoute = Router();

publicRoute.get("/auth/register", userController.getRegistration);
publicRoute.post("/auth/register", userController.postRegistration);
publicRoute.get("/auth/login", userController.getLogin);
publicRoute.post("/auth/login", userController.postLogin);
