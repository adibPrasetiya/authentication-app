import { Router } from "express";

export const protectedRoute = Router();

protectedRoute.get("/", async (req, res) => {
  res.render("welcome", { user: req.session.user });
});

protectedRoute.post("/auth/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/auth/login");
});
