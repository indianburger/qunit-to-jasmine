let recast = require("recast"),
  fs = require("fs"),
  b = recast.types.builders;

let runOptions = {
  writeback: contents => {
    fs.writeFileSync(process.argv[2], contents);
  }
};

let ConvertMatcher = recast.Visitor.extend({
  visitCallExpression: function(node) {
    let fnName = node.callee.name;
    if (fnName === "ok") {
      return convertOkMatcher(node);
    } else if (~["equal", "strictEqual", "deepEqual"].indexOf(fnName)) {
      return convertEqualMatcher(node);
    }
    this.genericVisit(node);
  }
});

recast.run((ast, callback) => {
  callback(new ConvertMatcher().visit(ast));
}, runOptions);


//helpers

function convertOkMatcher (node) {
  let expectCallExpr = b.callExpression(b.identifier("expect"), [node.arguments[0]]);
  let memberExpr = b.memberExpression(expectCallExpr, b.identifier("toBe"), false);

  return b.callExpression(memberExpr, [b.literal(true)]);
}

function convertEqualMatcher (node) {
  let expectCallExpr = b.callExpression(b.identifier("expect"), [node.arguments[0]]);
  let memberExpr = b.memberExpression(expectCallExpr, b.identifier("toEqual"), false);

  return b.callExpression(memberExpr, [node.arguments[1]]);
}