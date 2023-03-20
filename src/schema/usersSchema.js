import Joi from "joi"

export const loginSchema = Joi.object({
    email: Joi.string().email().required()
        .error(new Error('Email is required and must be a valid email address')),
    password: Joi.string().required()
        .error(new Error('Password is required'))
})

export const registerSchema = Joi.object({
    email: Joi.string().email().required()
        .error(new Error('Email is required and must be a valid email address')),
    password: Joi.string().min(8).max(30).required()
        .error(new Error('Password is required and must be at least 8 characters long')),
    confirmPassword: Joi.valid(Joi.ref('password'))
        .error(new Error('Confirm password must match the password'))
})

