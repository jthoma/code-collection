
/**
*  <file-name>
*  This is just a stub abstraction and all methods 
*  should be customized to perform the functions that is required
*/

import { Request, Response, NextFunction } from "express";
import { ERROR_CODES } from "../common/messages";


#--:method-handlers:--#

--start-method-handler--

 const :method-name: = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let response: string = "Include code to handle this event in <file-name> :method-name:";
        return res.status(ERROR_CODES.OK).send(response);
    } catch (error) {
        next(error)
    }
}

--end-method-handler--

