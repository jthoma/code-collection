/* jshint esversion: 8 */

const fs = require("fs");
var beautify = require('js-beautify').js;
var argv = require('optimist')
  .usage('Usage: $0 --input=[postman.json] --output=[code.js] ')
  .string(['input','output'])
  .demand(['input','output'])
  .argv;

var generateCode = (j) => {

  var code = [];

  code.push('/' + '**');
  code.push('* Abstraction of ' + j.info.name);
  code.push('* Created from Postman Export id: ' + j.info._postman_id);
  code.push('*/');

  code.push("");
  code.push("");

  code.push('const request = require("request");');
  code.push("");
  code.push("");
  code.push("module.exports = {");

  var max = j.item.length - 1;

  j.item.forEach((m, i) => {
    code.push('/' + '**');
    var action = m.name.substr(m.name.lastIndexOf('/') + 1, m.name.length);
    code.push(' * Action ' + action);
    code.push(' * Method ' + m.request.method);
    var hvars = [];
    var htags = [];
    m.request.header.forEach((h) => {
      if (h.key === "Content-Type" && h.value === "application/json") return;
      var varName = h.key.replace(/[\W_]+/g, "_").toLowerCase();
      code.push(' * @header {' + h.type + '} ' + varName);
      if (h.hasOwnProperty('description')) {
        code.push(' *      ' + h.description);
      }
      hvars.push(varName);
      htags.push("'" + h.key + "': " + varName);
    });
    var sBody = JSON.parse(m.request.body.raw);
    var sBodyKeys = Object.keys(sBody);
    var bvars = [];
    sBodyKeys.forEach((bk) => {
      var bVarName = bk.replace(/[\W_]+/g, "_").toLowerCase();
      if (hvars.indexOf(bVarName) === -1) {
        hvars.push(bVarName);
        code.push(' * @var {string} ' + bVarName);
      }
      bvars.push("'" + bk + "': " + bVarName);
    });

    code.push(' * @url (url) ' + m.request.url.raw);
    code.push(' */');


    code.push(action + ': function (' + hvars.join(', ') + '){');
    code.push("");
    code.push("var options = {");
    code.push("url: '" + m.request.url.raw + "',");
    code.push("method: '" + m.request.method + "',");
    code.push("json: true,");
    code.push("headers: {" + htags.join(",\n") + "},");
    code.push("body: {" + bvars.join(",\n") + "}");
    code.push("};");
    code.push("");

    code.push(" return new Promise( (s, f) => {");
    code.push("request(options, function (err, res, body){");
    code.push("\t\t\t" + "");

    code.push("  if (!err && res.statusCode == 200) {");
    code.push("    s(body);");
    code.push("  }else{");
    code.push("    f(err);");
    code.push("  }");

    code.push("});")
    code.push(" } );")
    if (i === max) {
      code.push("}");
    } else {
      code.push('},');
    }

  });

  code.push("};");

  return beautify(code.join("\n"), { indent_size: 4, space_in_empty_paren: true });

};


var input = JSON.parse(fs.readFileSync(argv.input).toString());
var code = generateCode(input);

fs.writeFileSync(argv.output, code);

