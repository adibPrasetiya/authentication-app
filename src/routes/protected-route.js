import { Router } from "express";
import userController from "../controllers/user-controller.js";

export const protectedRoute = Router();

protectedRoute.get("/", async (req, res) => {
  res.render("welcome", { user: req.session.user });
});

protectedRoute.post("/auth/logout", userController.logoutWithKeycloak);
protectedRoute.get("/auth/logout-callback", userController.logoutCallback);
