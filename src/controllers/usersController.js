import { loginUserService, registerUserService } from "../service/usersService.js"

export const loginUser = async (req, res, next) => {
    const {email, password} = req.body
    const user = {email, password}
    console.log(user)
    try {
        const result = await loginUserService(user)
        if(result.status !== undefined) return next(result)
        res.status(200).json({status : "Success", data : result})
    } catch (error) {
        return next(error)
    }
}

export const registerUser = async (req, res, next) => {
    const {email, password, confirmPassword} = req.body
    const user = {email, password, confirmPassword}
    console.log(user)
    try {
        const result = await registerUserService(user)
        if(result.status !== undefined) return next(result)
        res.cookies("Authorization", result.token)
        res.status(200).json({status : "Success", data : result})
    } catch (error) {
        return next(error)
    }
}
