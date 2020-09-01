
export function enableGesture(element) {
  let contexts = Object.create(null)
  let MOUSE_SYMBOL = Symbol("mouse")

  /* PC端鼠标手势 */
  if (document.ontouchstart !== null) {
    element.addEventListener("mousedown", () => {
      contexts[MOUSE_SYMBOL] = Object.create(null)
      start(event, contexts[MOUSE_SYMBOL])

      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL])
      }
      let mouseup = (event) => {
        end(event, contexts[MOUSE_SYMBOL])
        element.removeEventListener("mousemove", mousemove)
        element.removeEventListener("mouseup", mouseup)
      }

      element.addEventListener("mousemove", mousemove)
      element.addEventListener("mouseup", mouseup)
    })
  }

  /*
  移动端鼠标手势
  手势标识：event.changedTouches[0].identifier
  */
  element.addEventListener("touchstart", (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier])
    }
  })

  element.addEventListener("touchmove", (event) => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  })

  element.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })

  element.addEventListener("touchcancel", (event) => {
    for (let touch of event.changedTouches) {
      cancel(touch)
      delete contexts[touch.identifier]
    }
  })

  /* FINISH: 为什么touch事件同时会出发mouse事件？是的，可以通过判断Window.Touch禁用，不刷新也会导致重叠 */
  /* FINISH: event的changedTouches？较上一次手势事件变化的触点 */

  /* 手势抽象 */
  // FINISH: 加一个context来进行记录，区分mouse与touch，Why？因为移动端可能存在多点触控，而web只有一点
  let start = (point, context) => {
    element.dispatchEvent(new CustomEvent('start', {}))
    context.startX = point.clientX
    context.startY = point.clientY

    context.moves = []

    context.isTap = true
    context.isPan = false
    context.isPress = false

    // 停留超过0.5s，则视为进入press状态
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) {
        return
      }

      context.isTap = false
      context.isPan = false
      context.isPress = true
      element.dispatchEvent(new CustomEvent('pressstart', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY
        }
      }))
    }, 500)
  }

  let move = (point, context) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY

    // 移动超过10px，则视为进入pan状态，此处10px需要根据dpr进行计算
    if (
      dx ** 2 + dy ** 2 >= (10 * window.devicePixelRatio) ** 2 &&
      !context.isPan
    ) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent('presscancel', {}))
      }
      context.isTap = false
      context.isPan = true
      context.isPress = false
      element.dispatchEvent(new CustomEvent('panstart', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY
        }
      }))
    }

    context.moves = context.moves.filter(
      (record) => Date.now() - record.t < 300
    )

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      })
      element.dispatchEvent(new CustomEvent('pan', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY
        }
      }))
    }

    // console.log('move', dx, dy)
  }

  let end = (point, context) => {
    if (context.isPan) {
      // 总手势路径
      let dx = point.clientX - context.startX,
        dy = point.clientY - context.startY
      // 开始计算speed时已走过的路径
      let record = context.moves[0]
      // speed路径 = 总手势路径 - 开始计算speed时已走过的路径
      let speed =
        Math.sqrt((dx - record.dx) ** 2 + (dy - record.dy) ** 2) /
        (Date.now() - record.t)

      const isFlick = speed > 2.5
      if (isFlick) {
        element.dispatchEvent(new CustomEvent('flick', {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed: speed
        }))
      }
      element.dispatchEvent(new CustomEvent('panend', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed: speed,
          isFlick: isFlick
        }
      }))
    }
    if (context.isTap) {
      element.dispatchEvent(new CustomEvent('tap', {}))
    }
    if (context.isPress) {
      element.dispatchEvent(new CustomEvent('press', {}))
    }

    clearTimeout(context.timeoutHandler)
  }

  let cancel = (point, context) => {
    clearTimeout(context.timeoutHandler)
    element.dispatchEvent(new CustomEvent('cancel', {}))
  }

/* 
实现
1. tap：点击
2. pan：（慢）拖拽 pan之后不会变成press
3. Flick：（快）拖拽 快速离开 需要计算move速度(此处计算离开时0.5s的速度)
4. Press：长按
*/
}
