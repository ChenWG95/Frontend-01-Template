import { cubicBezier } from './cubicBezier.js'

/**
 * 时间线类
 *
 * 同一个时间线可以同时控制多个动画（同时可以满足每一帧只调一个函数的性能需求）
 * 多条时间线组合可以完成一些效果（比如植物大战僵尸中游戏暂停，但是僵尸还可以摇头晃脑）
 *
 * 需要加状态判断，否则多次重复操作pause / resume等操作就会出错
 * 
 * @export
 * @class Timeline
 */
export class Timeline {
  constructor () {
    this.state = 'inited'
    // 用set比数组好，从数组里面拿存在性能问题
    this.animations = new Set()
    this.finishedAnimations = new Set()
    this.addTimes = new Map()
    this.requestId = null
  }

  /**
   * 每帧执行的动画
   *
   * 遍历时间线内的动画，然后通过timingFunction结合template进行赋值
   * 
   * @memberof Timeline
   */
  tick() {
    let t = Date.now() - this.startTime
    for (let animation of this.animations) {
      let { obj, property, template, start, end, timingFunction, duration, delay } = animation
      let addTime = this.addTimes.get(animation)
      /* 好的timingFunction应该t（时间比例）为入参数，progression（进度比例）为出参*/
      let progression = timingFunction((t - delay - addTime) / duration) // 0 - 1之间的进度

      // t未到则不进行计算
      if (t < delay + addTime) {
        continue
      }

      if (t > duration + delay + addTime) {
        // 最后以duration + delay为输入，进度1为输出
        progression = 1
        this.animations.delete(animation)
        this.finishedAnimations.add(animation)
      }

      const value = animation.valueFromProgression(progression)

      /* 每帧移动根据timingFunction来决定，template设置值，时间存在delay的时候不移动所以需要减去delay */
      obj[property] = template(value)
    }

    if (this.animations.size) {
      // 随调用方改变this，可以迁移至constructor
      this.requestId = requestAnimationFrame(() => {
        this.tick()
      })
    } else {
      this.requestId = null
    }
  }

  start() {
    if (this.state !== 'inited') {
      return
    }

    this.state = 'playing'
    this.startTime = Date.now()
    this.tick()
  }

  pause() {
    if (this.state !== 'playing') {
      return
    }

    this.state = 'paused'
    this.pauseTime = Date.now()
    // 取消下一个tick
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId)
      this.requestId = null
    }
  }

  resume() {
    if (this.state !== 'paused') {
      return
    }

    this.state = 'resume'
    // 需要记住进度
    // 暂停时的进度为：pause - start
    // 重启时总时间(暂停进度 + 等待时间)为：resume - start
    // 去除等待时间则可恢复到暂停进度为：resume - start - (pause - start) = resume - pause
    this.startTime += (Date.now() - this.pauseTime)
    this.tick()
  }

  reset() {
    // 暂停 => 数值重置 => 播放
    if (this.state === 'playing') {
      this.pause()
    }

    this.animations = new Set()
    this.finishedAnimations = new Set()
    this.addTimes = new Map()
    this.requestId = null
    this.pauseTime = null
    this.startTime = Date.now()
    this.tick()
    this.state = 'inited'
  }

  restart() {
    // 暂停 => 数值重置 => 播放
    if (this.state === 'playing') {
      this.pause()
    }

    for (let animation of this.finishedAnimations) {
      this.animations.add(animation)
    }

    this.finishedAnimations = new Set()
    this.state = 'playing'
    this.requestId = null
    this.pauseTime = null
    this.startTime = Date.now()
    this.tick()
  }

  add(animation, addTime) {
    if (this.state === 'playing') {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime)
    } else {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : 0)
    }

    // 添加时若没有启动动画手动tick启动
    this.animations.add(animation)
    if (this.state === 'playing' && this.requestId === null) {
      this.tick()
    }
  }
}

/**
 * 动画类
 *
 * @export
 * @class Animation
 */
export class Animation {
  constructor(obj, property, start, end, duration, delay, timingFunction, template) {
    this.obj = obj
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timingFunction = timingFunction
  }
  
  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start)
  }
}

export class ColorAnimation {
  constructor(obj, property, start, end, duration, delay, timingFunction, template) {
    this.obj = obj
    this.property = property
    this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`)
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timingFunction = timingFunction
  }
  
  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    }
  }
}

/*
let aniamtion1 = new Animation(obj, property, template, start, end, duration, delay, timingFunction)
let aniamtion2 = new Animation(obj, property, template, start, end, duration, delay, timingFunction)
let timeLine = new Timeline()

timeLine.add(animation1)
timeLine.add(animation2)

timeLine.start()
timeLine.pause()
timeLine.resume()
timeLine.stop()
*/

const linear = t => t
const ease = cubicBezier(.25, .1, .25, 1)

export const timingFunction = {
  linear,
  ease
}
