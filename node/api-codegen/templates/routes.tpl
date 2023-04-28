


/**
 * <file-name>
 * the routing defenitons are here
 */

import express from 'express';
#--:import-controller:--#

const router = express();

#--:route-methods:--#

--start-route-method--
router.:method:(':route:', :controller-method-handler:);

--end-route-method--


