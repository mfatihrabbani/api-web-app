export const createError = (statusCode, message) => {
    let error = new Error()
    error.message = message
    error.status = statusCode
    return error
}