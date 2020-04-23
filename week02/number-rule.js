const { or, opt, recursion, combine } = require('./utils.js')

const Dot = '\\.'
const DecimalDigit = '[0-9]'
const NonZeroDigit = '[1-9]'
const ExponentIndicator = '[eE]'
const DecimalDigits = recursion(DecimalDigit)

const DecimalIntegerLiteral = or(
  '0',
  combine(NonZeroDigit, opt(DecimalDigits))
)
const SignedInteger = or(
  DecimalDigits,
  combine('[+-]?', DecimalDigits)
)
const ExponentPart = combine(ExponentIndicator, SignedInteger)

const BinaryDigits = '[01]'
const BinaryIntegerLiteral = combine('0[bB]', recursion(BinaryDigits))
const OctalDigits = '[0-7]'
const OctalIntegerLiteral = combine('0[oO]', recursion(OctalDigits))
const HexDigits = '[0-9a-fA-F]'
const HexIntegerLiteral = combine('0[xX]', recursion(HexDigits))
const DecimalLiteral = or(
  combine(DecimalIntegerLiteral, Dot, opt(DecimalDigits), opt(ExponentPart)),
  combine(Dot, DecimalDigits, opt(ExponentPart)),
  combine(DecimalIntegerLiteral, opt(ExponentPart))
)

const NumericLiteral = or(
  DecimalLiteral,
  BinaryIntegerLiteral,
  OctalIntegerLiteral,
  HexIntegerLiteral
)

console.log(NumericLiteral) // /((((0|[1-9]([0-9]+)?)\.([0-9]+)?([eE]([0-9]+|[+-]?[0-9]+))?|\.[0-9]+([eE]([0-9]+|[+-]?[0-9]+))?|(0|[1-9]([0-9]+)?)([eE]([0-9]+|[+-]?[0-9]+))?)|0[bB][01]+|0[oO][0-7]+|0[xX][0-9a-fA-F]+))/gi
