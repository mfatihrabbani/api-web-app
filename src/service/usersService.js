import Users from "../model/usersModel";
import { createError } from "../utils/errorHandle";

export const loginUserService = async (user) => {
  const { email, password } = user;
  if (!email && !password)
    return createError(401, "Email or password cannot empty");
  if (password.length < 8)
    return createError(401, "Password length must 8 or more");
  try {
    const checkAlreadyUsedEmail = await Users.findOne({
      where: { email: email },
    });
    const result = JSON.parse(JSON.stringify(checkAlreadyUsedEmail));
    if (result != null) return createError(401, "Email already Used");
    Users.create({
      email,
      password,
    });
    return { email };
  } catch (error) {
    console.log(error)
    return createError(404, "Something Error")
  }
};
