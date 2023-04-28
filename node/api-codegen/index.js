/**
 * Revisit this later
 * File: index.js
 * expecting -f <apidef-json-path> -d <directory> -n Name [-D <description>]
 */

const sentenceCase = function (txt){
    txt =  txt.toLowerCase();
    return (txt.substr(0,1)).toUpperCase() + txt.substr(1, txt.length);
}

const gettplChunk = function(tpl, tag){
    let boundary = ['--start-' + tag + '--', '--end-' + tag + '--'];
    tpl = tpl.toString();

    return tpl.substr(tpl.indexOf(boundary[0]), tpl.indexOf(boundary[1]) + boundary[1].length)
}

const cleanChunk = function(chunk, tag){
    let boundary = ['--start-' + tag + '--', '--end-' + tag + '--'];
    boundary.forEach( (item) => {
        chunk = chunk.replace(item, '');
    });
    return chunk;
}

const nukeMaskPath = function(mfileName, maskpath){
    return mfileName.replace(maskpath, '').replace('.ts', '');
}

const myGlobals = { isWin: false, isOsX:false, isNix:false };

// this var could likely a global or available to all parts of your app
if(/^win/.test(process.platform))     { myGlobals.isWin=true; }
else if(process.platform === 'darwin'){ myGlobals.isOsX=true; }
else if(process.platform === 'linux') { myGlobals.isNix=true; }

const fs = require("fs");

let apidef = '', dest = '', name = '', fileName = '', fileContents = '';
const methodReadableMap = {
    "get": "describe",
    "post": "create",
    "put": "edit",
    "patch": "update",
    "delete": "delete"
};

let argCheck = process.argv.indexOf('-f');
if( argCheck >= 0) {
    apidef = process.argv[(argCheck + 1)];
}else{
    console.log("no apidef json suggested ?");
    process.exit(1);
}

argCheck = process.argv.indexOf('-d');
if( argCheck >= 0) {
    dest = process.argv[(argCheck + 1)];
    console.log("Contents of " + dest + " will be overwritten!");
    // TODO: wait for user confirmation
}else{
    console.log("no destination suggested ?");
    process.exit(1);
}


argCheck = process.argv.indexOf('-n');
if( argCheck >= 0) {
    name = process.argv[(argCheck + 1)];
    console.log("Code for " + name + " will be generated into " + dest + "!");
    // TODO: wait for user confirmation
}else{
    console.log("no name suggested ?");
    process.exit(1);
}


const apidefJson = require(apidef);


let controllers = [], pathParts = [];

apidefJson.paths.forEach(path => {

    pathParts = path.route.split('/').filter((t) => {
        return (t.length > 0);
    });

    if(controllers.indexOf(pathParts[0]) < 0){
        controllers.push(pathParts[0]);
    }
});

var dirs = [
    dest,
    dest + '/' + 'src',
    dest + '/' + 'src/' + 'config',
    dest + '/' + 'src/' + 'logic',
    dest + '/' + 'src/' + 'common',
];

dirs.forEach((dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
});

/**
 *  create the package.json
 */
fileContents = fs.readFileSync(__dirname + '/templates/package-json.tpl');

fileName = dirs[0] +  '/package.json';

fileContents = fileContents.toString().replace('<name>', name);
fileContents = fileContents.replace('<desc>', "TO DO to add a description, none given");
fs.writeFileSync(fileName, fileContents);

/**
 * copy the tsconfig.json
 */
fs.copyFileSync('templates/tsconfig-json.tpl', dirs[0] + '/tsconfig.json');
fs.copyFileSync('templates/dot-eslint-ignore.tpl', dirs[0] + '/.eslintignore');
fs.copyFileSync('templates/dot-eslint-rc.tpl', dirs[0] + '/.eslintrc');
fs.copyFileSync('templates/messages.tpl', dirs[4] + '/messages.ts');

/**
 * create dirs[2] + 'index.js' which is the config module
 */

fileContents = fs.readFileSync(__dirname + '/templates/config.tpl');

fileName = dirs[2] +  '/index.ts'

fileContents = fileContents.toString().replace('<file-name>', nukeMaskPath(fileName, dirs[0]));
fs.writeFileSync(fileName, fileContents);


/**
 * prepare the controller template
 */

var controllerTemplate = {master: fs.readFileSync(__dirname + '/templates/controller.tpl').toString()};

controllerTemplate.subTpl = gettplChunk(controllerTemplate.master, 'method-handler');
controllerTemplate.master = controllerTemplate.master.replace(controllerTemplate.subTpl, '');
controllerTemplate.subTpl = cleanChunk(controllerTemplate.subTpl, 'method-handler');

/**
 * prepare the router template
 */
var routerTemplate = {master: fs.readFileSync(__dirname + '/templates/routes.tpl').toString()};
routerTemplate.subTpl = gettplChunk(routerTemplate.master, 'route-method');
routerTemplate.master = routerTemplate.master.replace(routerTemplate.subTpl,'');
routerTemplate.subTpl = cleanChunk(routerTemplate.subTpl, 'route-method')

/**
 * prepare the index template
 */

var indexTemplate = {master: fs.readFileSync(__dirname + '/templates/index.tpl').toString(), "routeImports":[], "routeDefs": []};


/**
 * prepare the controllers 
 */
controllers.forEach((controller) => {
    let controllerModule = controller + 'Controller';
    fileName = dirs[3] + '/' + controllerModule + '.ts';
    fileContents = controllerTemplate.master.replace('<file-name>', nukeMaskPath(fileName, dirs[0]));
    fileContents = fileContents.replace(/:controller:/gi, controller);

    let methodHandlers = [], routeMethods = [], handlersToExport = [];

    apidefJson.paths.forEach(path => {

        pathParts = path.route.split('/').filter((t) => {
            return (t.length > 0);
        });
    
        if(controller === pathParts[0]){
            path.methods.forEach((mt) => {
                let methodName = methodReadableMap[mt] + sentenceCase(controller);
                if(pathParts.length == 1) methodName += 's'; // plural
                handlersToExport.push(methodName);
                methodHandlers.push(
                    controllerTemplate.subTpl.replace(/:method-name:/g, methodName).replace(/<file-name>/g, fileName)
                );
                routeMethods.push(
                    routerTemplate.subTpl
                        .replace(/:controller:/gi, controller)
                        .replace(':controller-method-handler:', controllerModule + '.' + methodName)
                        .replace(':method:', mt.toLowerCase())
                        .replace(':route:', nukeMaskPath(path.route, '/' + controller))
                );
            });

        }
    });

    // add the export statement

    methodHandlers.push("");
    methodHandlers.push('export default {' + handlersToExport.join(',') + '}; ');
    
    fileContents = fileContents.replace('#--:method-handlers:--#', methodHandlers.join("\r\n"));

    //writeout the controller
    fs.writeFileSync(fileName, fileContents);

    // go for the corresponding route template

    fileName = fileName.replace('Controller', 'Router');

    routeMethods.push('export { router as ' + controller + 'Route };');

    fileContents = routerTemplate.master
    .replace('<file-name>', fileName)
        .replace('#--:import-controller:--#','import ' + controllerModule + ' from "./' + controllerModule + '"')
        .replace('#--:route-methods:--#', routeMethods.join("\r\n"));

        //writeout the router
    fs.writeFileSync(fileName, fileContents);
    indexTemplate.routeImports.push(
        'import { ' + controller + 'Route } from ".' + nukeMaskPath(fileName, dirs[1]) + '";'        
    );

    indexTemplate.routeDefs.push(
        "app.use('/"+ controller + "', "+ controller + 'Route)'
    );
    
});


// wrap everything into index.ts
fileName = dirs[1] + '/index.ts';
fileContents = indexTemplate.master
                .replace('<file-name>', nukeMaskPath(fileName, dirs[0]))
                .replace('#--:import-routes:--#', indexTemplate.routeImports.join("\r\n"))
                .replace('#--:define-routes:--#', indexTemplate.routeDefs.join("\r\n"));

fs.writeFileSync(fileName, fileContents);


