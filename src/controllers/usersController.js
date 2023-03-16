import { loginUserService, registerUserService, forgotPasswordService, createForgotPasswordService } from "../service/usersService.js"

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
        // res.cookies("Authorization", result.token)
        res.status(200).json({status : "Success", data : result})
    } catch (error) {
        return next(error)
    }
}

export const forgotPassword = async (req, res, next) => {
    const {newPassword, confirmPassword} = req.body
    const token = req.params.token
    const password = {
        newPassword,
        confirmPassword,
        token
    }
    try{
        await forgotPasswordService(password)
        res.status(200).json({
            status: "Success",
            data: "Password success to update"
        })
    }catch(error){
        return next(error)
    }
}

export const createForgotPassword = async (req, res, next) => {
    const {idUser} = req.body
    try{
        const result = await createForgotPasswordService(idUser)
        res.status(200).json({
            status: "Success",
            data: result
        })
    }catch(error){
        return next(error)
    }
}
