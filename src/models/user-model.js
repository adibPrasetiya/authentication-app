import { prismaClient } from "../app/database.js";
import { createuserValidator } from "../validators/user-validator.js";
import { validate } from "../validators/validator.js";
import { ResponseError } from "../errors/response-error.js";
import bcrypt from "bcrypt";

const create = async (reqBody) => {
  reqBody = validate(createuserValidator, reqBody);

  const countUser = await prismaClient.users.count({
    where: {
      email: reqBody.email,
    },
  });

  if (countUser !== 0) {
    throw new ResponseError(400, "Gagal melakukan pendaftaran pengguna");
  }

  reqBody.password = await bcrypt.hash(reqBody.password, 10);

  await prismaClient.users.create({
    data: reqBody,
  });

  return "OK";
};

const login = async (reqBody) => {
  reqBody = validate(createuserValidator, reqBody);

  const user = await prismaClient.users.findUnique({
    where: {
      email: reqBody.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "Email atau password salah");
  }

  console.log(user);

  const validatePassword = await bcrypt.compare(
    reqBody.password,
    user.password
  );

  if (!validatePassword) {
    throw new ResponseError(404, "Email atau password salah");
  }

  return {
    id: user.id,
    email: user.email,
  };
};

export default {
  create,
  login,
};
