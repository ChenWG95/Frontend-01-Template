/**
 * 匹配abababx状态机实现
 *
 * @param {*} string 匹配字符
 * @returns
 */
function match (string) {
  var state = start
  for (let c of string) {
    state = state(c)
  }

  return state === end

  function start (c) {
    if (c === 'a') {
      return foundA
    } else {
      return start(c)
    }
  }

  function foundA (c) {
    if (c === 'b') {
      return foundB
    } else {
      return start(c)
    }
  }

  function foundB (c) {
    if (c === 'a') {
      return foundA2
    } else {
      return start(c)
    }
  }

  function foundA2 (c) {
    if (c === 'b') {
      return foundB2
    } else {
      return foundA(c)
    }
  }

  function foundB2 (c) {
    if (c === 'a') {
      return foundA3
    } else {
      return foundB(c)
    }
  }

  function foundA3 (c) {
    if (c === 'b') {
      return foundB3
    } else {
      return foundA2(c)
    }
  }

  function foundB3 (c) {
    if (c === 'x') {
      return end
    } else {
      return foundB2(c)
    }
  }

  function end () {
    return end
  }
}
