import userModel from "../models/user-model.js";

const getRegistration = async (req, res, next) => {
  try {
    res.render("auth/register", {
      errorMessage: req.flash("error"),
    });
  } catch (error) {
    next(error);
  }
};

const postRegistration = async (req, res, next) => {
  try {
    await userModel.create(req.body);
    res.redirect("login");
  } catch (error) {
    next(error);
  }
};

const getLogin = async (req, res, next) => {
  try {
    res.render("auth/login", { errorMessage: req.flash("error") });
  } catch (error) {
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const result = await userModel.login(req.body);
    req.session.userId = result.id;
    req.session.user = result;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export default {
  getRegistration,
  postRegistration,
  getLogin,
  postLogin,
};
