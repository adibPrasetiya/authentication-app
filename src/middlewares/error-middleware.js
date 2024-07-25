import { ResponseError } from "../errors/response-error.js";
import { InputValidationError } from "../errors/validation-error.js";
import flash from "connect-flash";

export const errorMiddleware = async (err, req, res, next) => {
  console.log(err);
  if (!err) {
    next();
    return;
  }

  if (req.accepts("json")) {
    if (err instanceof InputValidationError) {
      err.errors = {};
      err.details.forEach((detail) => {
        err.errors[detail.path.join(".")] = detail.message;
      });

      res
        .status(err.status || 400)
        .json({
          status: "error",
          message: err.message,
          errors: err.errors || {},
        })
        .end();
    } else if (err instanceof ResponseError) {
      // res.status(err.status || 400).json({
      //   status: "error",
      //   errors:
      //     {
      //       error: err.message,
      //     } || {},
      // });
      req.flash("error", err.message);
    }
  } else {
    // res.status(err.status || 500).render("errors/global-error", {
    //   title: "Error",
    //   message: err.message || "Internal Server Error",
    //   status: err.status || 500,
    // });
    req.flash("error", "Internal service error");
  }
};
