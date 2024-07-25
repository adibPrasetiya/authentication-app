import { InputValidationError } from "../errors/validation-error.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    const errors = result.error;
    errors.details.map((detail) => {
      return {
        message: detail.message,
        path: detail.path.join("."),
      };
    });
    throw new InputValidationError(
      400,
      "Input Validation Error",
      errors.details
    );
  } else {
    return result.value;
  }
};

export { validate };
