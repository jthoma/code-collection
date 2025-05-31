
if(process.argv.length < 3){
  console.error("Expects api-defenition as openapi structure in first argument");
  process.exit(1);
}

var apiDef ;
const apidef = process.argv[2];

   const fs = require('fs');

   try {
     const jsonString = fs.readFileSync(apidef, 'utf8');
     apiDef = JSON.parse(jsonString);
   } catch (err) {
     console.error('Error:', err);
     process.exit(1);
   }

function mkCode(bk, htpl){
   var rk = Object.keys(bk["responses"]);
   var code = '';
    code = htpl.replace('%description%', bk["description"]);
    code = code.replace('%if dynamic route%','Capture variable from event url');
    code = code.replace('%success_code%',rk[0]);
    code = code.replace("%success_message%", bk["responses"][rk[0]]["description"]);
    code = code.replace('%failed_code%',rk[1]);
    code = code.replace("%failed_message%", bk["responses"][rk[1]]["description"]);
  return code;
}

/* Process data and create the code */
const RootKey = Object.keys(apiDef)[0];
const RoutePatterns = Object.keys(apiDef[RootKey]['endpoints']);

// console.log({RootKey, RoutePatterns});

var dynamicroutes = [], staticroutes = [], forcode = {};

for(h=0 ; h < RoutePatterns.length ; h++){

var rp = RoutePatterns[h];

var tpf = rp.toLowerCase().split(" ");

var routeDef = { "method": tpf[0], "pattern": tpf[1], "handler": ""};
var handlerPattern = tpf[0] + '_' + tpf[1];

var bk = apiDef[RootKey]['endpoints'][rp];

var fk = Object.keys(bk);

if(bk.hasOwnProperty("parameters") && bk["parameters"][0]["in"] == "path" ){
  //console.log(bk["parameters"][0]);

  handlerPattern = handlerPattern.replace('/{'+bk["parameters"][0]["name"]+'}','');
}
handlerPattern = handlerPattern.replace(' ','_').replace('/','_');

routeDef.handler = handlerPattern + '.js';
forcode[routeDef.handler] = bk;

if(rp.indexOf('{') == -1){
  // static route
  staticroutes.push(routeDef);
}else{
  // dynamic route
  dynamicroutes.push(routeDef);
}

}

var tpltags = ['/* ROUTE_DEF_START */','/* ROUTE_DEF_END */'];
var routetpl = fs.readFileSync('src/lib/router.js', 'utf8');

var tplsegs = [];

var tmpsega = routetpl.split(tpltags[0]);

tplsegs.push(tmpsega[0]);
var tmpsegb = tmpsega[1].split(tpltags[1]);

tplsegs.push(tmpsegb[1]);

var cfgtxt = "\n" + 'const DYNAMIC_ROUTES =' + 
	JSON.stringify(dynamicroutes) + ";\n";
    cfgtxt += 'const STATIC_ROUTES =' + 
	JSON.stringify(staticroutes) + ";\n";

var router = tplsegs[0] + tpltags[0] + cfgtxt + tpltags[1] + tplsegs[1];

fs.writeFileSync('src/lib/router.js', router);

var htpl = fs.readFileSync("src/routes/handler.tpl","utf8");
var rhf = "";
var handlers = [];
/* write the handlers */
for(let rtd in dynamicroutes){
   rhf = "src/routes/" + dynamicroutes[rtd]["handler"];
   var bk = forcode[dynamicroutes[rtd]["handler"]];
   var code = mkCode(bk, htpl);
   fs.writeFileSync(rhf, code);
   handlers.push(dynamicroutes[rtd]["handler"]);
}

for(let rts in staticroutes){
   rhf = "src/routes/" + staticroutes[rts]["handler"];
   var bk = forcode[staticroutes[rts]["handler"]];
   var code = mkCode(bk, htpl);
   fs.writeFileSync(rhf, code);
   handlers.push(staticroutes[rts]["handler"]);
}


/* update handler list */
var listFile = 'src/lib/handlers.js';

var listCode = 'module.exports = ' + JSON.stringify(handlers, null, 2) + ";\n";
fs.writeFileSync(listFile, listCode);

console.log("Done");
