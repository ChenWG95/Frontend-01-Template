// function match(selector, element) {
//   return true
// }
// match("div #id.class", document.getElementById("id"))
function findElement(complexSelector) {
  const idReg = /#[\w-]*/
  const clsReg = /.[\w-]*/
  const tagReg = /^[\w-]*$/

  let selector = null
  if (idReg.test(complexSelector)) {
    selector = idReg.exec(complexSelector)[0]
  } else if (clsReg.test(complexSelector)) {
    selector = clsReg.exec(complexSelector)[0]
  } else if (tagReg.test(complexSelector)) {
    selector = tagReg.exec(complexSelector)[0]
  }

  return selector && document.querySelector(selector)
}

function findElementInParent (element, parentElement) {
  // 深层遍历parentElement, 查找是否存在element
  for (let child of Array.from(parentElement.children)) {
    if (child.isSameNode(element)) {
      return element
    }

    if (Array.from(child.children).length > 0) {
      return findElementInParent(element, child)
    }
  }
}

function match(selector, targetElement) {
  let curElement = null
  const complexSelectorList = selector.split(' ')

  while (complexSelectorList.length > 0) {
    const complexSelector = complexSelectorList.shift()
    const element = findElement(complexSelector)

    if (!curElement) {
      // 当前元素为空时设置curElement为顶层元素，之后若有元素在此范围内查找
      curElement = element
      continue
    }

    curElement = findElementInParent(element ,curElement)
  }

  return curElement === targetElement
}

match('body div#s_top_wrap', document.querySelector('#s_top_wrap'))