const css = require('css')

let rules = []
function addCssRules (text) {
  const ast = css.parse(text)
  // console.log(JSON.stringify(ast, null, "   "))
  rules.push(...ast.stylesheet.rules)
}

module.exports = {
  rules,
  addCssRules
}