export const createError = (statusCode, message) => {
    let error = new Error()
    error.message = message
    error.status = statusCode
    return error
}

export const validationError = (statusCode, message) => {
    let error = new Error()
    if(Array.isArray(message)){
        let errorList = []
        message.forEach(msg => {
            errorList.push(msg.message)
        })
        error.message = errorList
        error.status = statusCode
        error.type = "VALIDATION"
        throw error
    }
    if(!Array.isArray(message)){
        error.message = message
        error.status = statusCode
        error.type = "VALIDATION"
        throw error
    }
}

export const parsingToJSObject = (data) => {
    return JSON.parse(JSON.stringify(data))
}
