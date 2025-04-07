/**
cd routes
echo 'var mdule.exports = [' > ../lib/handlers.js
for i in *.js ; do  echo "'$i',"; done >> ../lib/handlers.js
echo '];' >> ../lib/handlers.js
*/

/*
* before each build and deploy process
* the above shell routine should run 
*  which actually reduces the possibility of handling 404 erros and running 
*  into a Denial of service situation.
*/

const DYNAMIC_ROUTES = [
  { method: "post", pattern: "cargo/tracking/{type}/{provider}", handler: "cargo_tracking.js" },
  { method: "get",  pattern: "user/signup/{type}/{value}" }
];

const STATIC_ROUTES = [
  { method: "any", path: "/", handler: "homepage.js" }
];

function mknam(s) {
  return s.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
}

function findvars(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length > pathParts.length) return null;

  const vars = {};
  const staticParts = [];

  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const actual = pathParts[i];

    if (p.startsWith('{') && p.endsWith('}')) {
      vars[p.slice(1, -1)] = actual;
    } else if (p === actual) {
      staticParts.push(p);
    } else {
      return null;
    }
  }

  vars.path = staticParts.join('/');
  return vars;
}

function routeLookup(req) {
  const method = (req.method || '').toLowerCase();
  const epnam = mknam(req.path);
  let result = { filename: `${method}_${epnam}.js` };

  for (let route of STATIC_ROUTES) {
    if ((route.method === "any" || route.method === method) && route.path === req.path) {
      return { filename: route.handler };
    }
  }

  for (let route of DYNAMIC_ROUTES) {
    if (route.method === "any" || route.method === method) {
      let vars = findvars(route.pattern, req.path);
      if (vars) {
        const fileName = route.handler || `${method}_${mknam(vars.path)}.js`;
        return { fileName, vars };
      }
    }
  }

  return result;
}

async function jparse(event) {
  try {
    return routeLookup({
      path: event.path,
      method: event.httpMethod
    });
  } catch (err) {
    console.error('Error in router:', err);
    return false;
  }
}

module.exports = { jparse };
