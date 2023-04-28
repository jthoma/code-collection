

/**
 *   /src/commonn/message.ts
 *  
 *   this file is to be abstracted by almost all the controllers
 *   as of now this is just a placeholder and only a simple message is implemented
 *   feel free to add more of yours and enjoy
 */


const ERROR_CODES = {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

class BaseError extends Error {
    statusCode: number
    constructor(
        name: string,
        statusCode: number,
        description: string
    ) {
        super(description);
        this.name = name;
        this.statusCode = statusCode
    }
}

// Resource not found: 404
class NotFoundError extends BaseError {
    constructor() {
        super(
            "not found",
            ERROR_CODES.NOT_FOUND,
            "The requested resource was not found, could be our servers ar in a bad mood"
        );
    }
}
// internal Service error: 500
class InternalServiceError extends BaseError {
    constructor() {
        super(
            "internal server error",
            ERROR_CODES.INTERNAL_ERROR,
            "The intented response could not be generated as our server met with some error"
        );
    }
}

/** 
 * exporting the defined classes, make sure you add more if you need and use these around
 */ 
export { ERROR_CODES, NotFoundError, InternalServiceError };