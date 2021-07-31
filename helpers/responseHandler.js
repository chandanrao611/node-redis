module.exports = (res, data, message = 'Success') => {
    if (data && data.isBoom && data.isBoom == true) {
        const error = data.output.payload;
        const statusCode = data.output.statusCode;
        if (data.data != null) {
            error.data = data.data;
        }
        const errResponse = {
            statusCode: statusCode,
            Code: 0,
            message: error.message,
            data: {},
        };
        res.status(statusCode).json(errResponse)
    }
    else {
        const response = {
            statusCode: 200,
            code: 1,
            message,
            data,
        };
        res.status(200).json(response);
    }
};