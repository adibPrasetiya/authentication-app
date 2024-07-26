import { generators } from "openid-client";
import { getClient } from "../app/keycloak.js";
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

const getLoginWithKeycloak = async (req, res, next) => {
  try {
    const client = getClient();
    const code_verifier = generators.codeVerifier();
    req.session.code_verifier = code_verifier;
    const code_challenge = generators.codeChallenge(code_verifier);

    const authorizationUrl = client.authorizationUrl({
      scope: "openid email profile",
      code_challenge: code_challenge,
      code_challenge_method: "S256",
    });

    res.redirect(authorizationUrl);
  } catch (error) {
    next(error);
  }
};

const loginCallback = async (req, res, next) => {
  try {
    const client = getClient();
    const params = client.callbackParams(req);
    const code_verifier = req.session.code_verifier; // Ambil code_verifier dari sesi
    if (!code_verifier) {
      return res.status(400).send("Code verifier not found in session");
    }

    const tokenSet = await client.callback(
      "http://localhost:3000/auth/callback",
      params,
      {
        code_verifier: code_verifier,
      }
    );
    req.session.tokenSet = tokenSet;
    req.session.user = tokenSet.claims();
    res.redirect("/");
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

const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
};

const logoutWithKeycloak = async (req, res, next) => {
  try {
    const client = await getClient();

    const id_token_hint = req.session.tokenSet.id_token;
    req.session.destroy(async (err) => {
      if (err) {
        console.log(err);
      }
      const endSessionUrl = await client.endSessionUrl({
        id_token_hint: id_token_hint,
        post_logout_redirect_uri: "http://localhost:3000/auth/logout-callback",
      });
      res.redirect(endSessionUrl);
    });
  } catch (error) {
    next(error);
  }
};

const logoutCallback = async (req, res, next) => {
  try {
    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
};

export default {
  getRegistration,
  postRegistration,
  getLogin,
  postLogin,
  getLoginWithKeycloak,
  loginCallback,
  logout,
  logoutWithKeycloak,
  logoutCallback,
};
