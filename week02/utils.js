const or = (...args) => `(${args.join('|')})`
const opt = (...args) => `(${args})?`
const recursion = (reg) => `${reg}+`
const combine = (...args) => args.join('')

module.exports = {
  or,
  opt,
  recursion,
  combine
}