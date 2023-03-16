export const createError = (statusCode, message) => {
    let error = new Error()
    error.message = message
    error.status = statusCode
    return error
}

export const validationError = (statusCode, message) => {
    if(message.length > 0){
        let error = new Error()
        error.message = message
        error.status = statusCode
        error.type = "VALIDATION"
        throw error
    }
}

export const parsingToJSObject = (data) => {
    return JSON.parse(JSON.stringify(data))
}
