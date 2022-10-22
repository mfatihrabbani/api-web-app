import { loginUserService } from "../service/usersServicejs"
import { createError } from "../utils/errorHandle"

export const loginUser = async (req, res, next) => {
    const {email, password} = req.body
    const user = {email, password}
    try {
        const result = await loginUserService(user)
        if(result.statusCode !== undefined) return next(result)
        res.status(200).json({status : "Success", data : result})
    } catch (error) {
        return next(error)
    }
}

export const registerUser = (req, res, next) => {

}
