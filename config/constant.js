require('dotenv').config();
const defaultNumber = -1;
const messages = {
    success: {
        message: 'success',
        statusCode: 200
    },
    interalError: {
        error: 'system error',
        message: '',
        statusCode: 500
    },
    unauthorized: {
        error: 'unauthorized',
        message: '',
        statusCode: 501
    },
    payloadError: {
        error: 'wrong package load',
        message: '',
        statusCode: 502
    },
}

const ignoreApp = Array('web', 'collector');

module.exports = {
    defaultNumber,
    messages,
    ignoreApp
}
