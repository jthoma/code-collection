
/**
* <file-name>
* main file for <name>
* this is the entry point
* Author: <your name><email>
*/ 

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './config'
#--:import-routes:--#

const app = express();
app.use(express.json());
app.use(cors());

#--:define-routes:--#

/**
 * This is the final route, which should catch errors
 * should customize this with standard messages
 */

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.statusCode || 500).json(error.data || error.message);
});

/**
 * this invokes the express module to listen on the port 
 */
 
(async () => {
    try {

        /**
         * Any custom and project specific initialization goes here
         * like initialization of database connection or any external service connections
         */

        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
})();

