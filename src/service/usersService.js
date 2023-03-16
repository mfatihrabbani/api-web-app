import Users from "../model/usersModel.js";
import ForgotPassword from "../model/forgotPassword.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import uniqid from "uniqid"
import { createError, validationError, parsingToJSObject } from "../utils/errorHandle.js";

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

export const createForgotPasswordService = async (idUser) => {
  let error = []
  if(!idUser) error.push("Please check again your id user")
  validationError(400, error)
  let user = await Users.findOne({where: {id_user: idUser}})
  user =  parsingToJSObject(user)
  if(user == null) createError(404, "User not found")
  const token = jwt.sign({
    idUser,
  }, 'TOKEN_FORGOT_PASSWORD',
  {expiresIn: 60 * 60});
  const storeToken = await ForgotPassword.create({
    token
  })
  return token
}

export const forgotPasswordService = async (password) => {
  const {newPassword, confirmPassword, token} = password
  console.log(token)
  let error = []
  if(!newPassword) error.push("Password cannot blank")
  if(!confirmPassword) error.push("Confirm password cannot blank")
  if(newPassword.length < 8) error.push("Password must be at least 8 characters long")
  if(newPassword != confirmPassword) error.push("Password doesnt match")
  validationError(404, error)
  let checkAlreadyToken = await ForgotPassword.findOne({where: {token}})
  checkAlreadyToken = parsingToJSObject(checkAlreadyToken)
  if(checkAlreadyToken == null) throw createError(404, "Token not found")
  if(checkAlreadyToken.used) throw createError(404, "Token already used")
  const idUser = await jwt.verify(token, 'TOKEN_FORGOT_PASSWORD')
  const hashNewPassword = await bcrypt.hash(newPassword, 10)
  const updatePassword = Users.update({password: hashNewPassword}, {where: {id_user: idUser.idUser}})
  const setUsedToken = await ForgotPassword.update({used: true}, {where: {token}})
}
