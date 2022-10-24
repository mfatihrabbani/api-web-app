import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import uniqid from "uniqid"
import { createError } from "../utils/errorHandle.js";

export const registerUserService = async (user) => {
  const { email, password, confirmPassword } = user;
  if (!email || !password || !confirmPassword)
    return createError(401, "Email or password cannot empty");
  if (password.length < 8)
    return createError(401, "Password length must 8 or more");
  if (password != confirmPassword)
    return createError(401, "Password doenst match");
  try {
    const checkAlreadyUsedEmail = await Users.findOne({
      where: { email: email },
    });
    const result = JSON.parse(JSON.stringify(checkAlreadyUsedEmail));
    if (result != null) return createError(401, "Email already Used");
    const id = uniqid()
    const hashPassword = await bcrypt.hash(password, 10);
    Users.create({
      id_user : id,
      email,
      password : hashPassword,
    });
    return {email};
  } catch (error) {
    console.log(error);
    return createError(404, "Something Error");
  }
};

export const loginUserService = async (user) => {
  const { email, password } = user;
  console.log(email + " "+ password)
  if(!email || !password) return createError(401, "Email or password cannot empty")
  try {
    const userData = await Users.findOne({where: {email}})
    const result = JSON.parse(JSON.stringify(userData))
    if(result == null) return createError(404, "User not found")
    const checkMatchPassword = await bcrypt.compare(password, result.password)
    if(!checkMatchPassword) return createError(401, "Please check again your password")
    const token = jwt.sign({id: result.id_user}, "RAHASIA")
    return {token}
  } catch (error) {
    console.log(error);
    return createError(404, "Something Error");
  }
};
