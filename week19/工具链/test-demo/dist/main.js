/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/createElement.js":
/*!******************************!*\
  !*** ./lib/createElement.js ***!
  \******************************/
/*! exports provided: create, Text, Wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony import */ var _gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture */ \"./lib/gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n/** 创建元素函数：决定组件设计 */\n\nfunction create(Cls, attributes) {\n  var o; // 知识点1\n\n  if (typeof Cls === 'string') {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === 'string') {\n          child = new Text(child);\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    // config\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      this.root.setAttribute(name, value); // 绑定on事件\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        var eventName = RegExp.$1.replace(/^[\\s\\S]/, function (v) {\n          return v.toLowerCase();\n        });\n        this.root.addEventListener(eventName, value);\n      } // 绑定手势事件\n\n\n      if (name === 'enableGesture') {\n        Object(_gesture__WEBPACK_IMPORTED_MODULE_0__[\"enableGesture\"])(this.root);\n      }\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      this.children.push(child);\n    }\n  }, {\n    key: \"id\",\n    set: function set(v) {\n      // property\n      console.log('Parent::id', v);\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./lib/createElement.js?");

/***/ }),

/***/ "./lib/gesture.js":
/*!************************!*\
  !*** ./lib/gesture.js ***!
  \************************/
/*! exports provided: enableGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableGesture\", function() { return enableGesture; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction enableGesture(element) {\n  var contexts = Object.create(null);\n  var MOUSE_SYMBOL = Symbol(\"mouse\");\n  /* PC端鼠标手势 */\n\n  if (document.ontouchstart !== null) {\n    element.addEventListener(\"mousedown\", function () {\n      contexts[MOUSE_SYMBOL] = Object.create(null);\n      start(event, contexts[MOUSE_SYMBOL]);\n\n      var mousemove = function mousemove(event) {\n        move(event, contexts[MOUSE_SYMBOL]);\n      };\n\n      var mouseup = function mouseup(event) {\n        end(event, contexts[MOUSE_SYMBOL]);\n        element.removeEventListener(\"mousemove\", mousemove);\n        element.removeEventListener(\"mouseup\", mouseup);\n      };\n\n      element.addEventListener(\"mousemove\", mousemove);\n      element.addEventListener(\"mouseup\", mouseup);\n    });\n  }\n  /*\n  移动端鼠标手势\n  手势标识：event.changedTouches[0].identifier\n  */\n\n\n  element.addEventListener(\"touchstart\", function (event) {\n    var _iterator = _createForOfIteratorHelper(event.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  element.addEventListener(\"touchmove\", function (event) {\n    var _iterator2 = _createForOfIteratorHelper(event.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  });\n  element.addEventListener(\"touchend\", function (event) {\n    var _iterator3 = _createForOfIteratorHelper(event.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  });\n  element.addEventListener(\"touchcancel\", function (event) {\n    var _iterator4 = _createForOfIteratorHelper(event.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        cancel(touch);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  });\n  /* FINISH: 为什么touch事件同时会出发mouse事件？是的，可以通过判断Window.Touch禁用，不刷新也会导致重叠 */\n\n  /* FINISH: event的changedTouches？较上一次手势事件变化的触点 */\n\n  /* 手势抽象 */\n  // FINISH: 加一个context来进行记录，区分mouse与touch，Why？因为移动端可能存在多点触控，而web只有一点\n\n  var start = function start(point, context) {\n    element.dispatchEvent(new CustomEvent('start', {}));\n    context.startX = point.clientX;\n    context.startY = point.clientY;\n    context.moves = [];\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false; // 停留超过0.5s，则视为进入press状态\n\n    context.timeoutHandler = setTimeout(function () {\n      if (context.isPan) {\n        return;\n      }\n\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true;\n      element.dispatchEvent(new CustomEvent('pressstart', {\n        detail: {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      }));\n    }, 500);\n  };\n\n  var move = function move(point, context) {\n    var dx = point.clientX - context.startX,\n        dy = point.clientY - context.startY; // 移动超过10px，则视为进入pan状态，此处10px需要根据dpr进行计算\n\n    if (Math.pow(dx, 2) + Math.pow(dy, 2) >= Math.pow(10 * window.devicePixelRatio, 2) && !context.isPan) {\n      if (context.isPress) {\n        element.dispatchEvent(new CustomEvent('presscancel', {}));\n      }\n\n      context.isTap = false;\n      context.isPan = true;\n      context.isPress = false;\n      element.dispatchEvent(new CustomEvent('panstart', {\n        detail: {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      }));\n    }\n\n    context.moves = context.moves.filter(function (record) {\n      return Date.now() - record.t < 300;\n    });\n\n    if (context.isPan) {\n      context.moves.push({\n        dx: dx,\n        dy: dy,\n        t: Date.now()\n      });\n      element.dispatchEvent(new CustomEvent('pan', {\n        detail: {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      }));\n    } // console.log('move', dx, dy)\n\n  };\n\n  var end = function end(point, context) {\n    if (context.isPan) {\n      // 总手势路径\n      var dx = point.clientX - context.startX,\n          dy = point.clientY - context.startY; // 开始计算speed时已走过的路径\n\n      var record = context.moves[0]; // speed路径 = 总手势路径 - 开始计算speed时已走过的路径\n\n      var speed = Math.sqrt(Math.pow(dx - record.dx, 2) + Math.pow(dy - record.dy, 2)) / (Date.now() - record.t);\n      var isFlick = speed > 2.5;\n\n      if (isFlick) {\n        element.dispatchEvent(new CustomEvent('flick', {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY,\n          speed: speed\n        }));\n      }\n\n      element.dispatchEvent(new CustomEvent('panend', {\n        detail: {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY,\n          speed: speed,\n          isFlick: isFlick\n        }\n      }));\n    }\n\n    if (context.isTap) {\n      element.dispatchEvent(new CustomEvent('tap', {}));\n    }\n\n    if (context.isPress) {\n      element.dispatchEvent(new CustomEvent('press', {}));\n    }\n\n    clearTimeout(context.timeoutHandler);\n  };\n\n  var cancel = function cancel(point, context) {\n    clearTimeout(context.timeoutHandler);\n    element.dispatchEvent(new CustomEvent('cancel', {}));\n  };\n  /* \n  实现\n  1. tap：点击\n  2. pan：（慢）拖拽 pan之后不会变成press\n  3. Flick：（快）拖拽 快速离开 需要计算move速度(此处计算离开时0.5s的速度)\n  4. Press：长按\n  */\n\n}\n\n//# sourceURL=webpack:///./lib/gesture.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createElement */ \"./lib/createElement.js\");\nfunction cov_1k2r24tu3u() {\n  var path = \"/Users/chenweiguang/Documents/\\u6211\\u7684\\u9879\\u76EE/\\u524D\\u7AEF\\u8BAD\\u7EC3\\u8425/\\u8BFE\\u7A0B\\u7B14\\u8BB0/30-\\u7EC4\\u4EF6\\u5316-\\u5927\\u6210/test-demo/src/main.js\";\n  var hash = \"0dbafc5d0dabef4c384812a37a3269a2be57eb2b\";\n  var global = new Function(\"return this\")();\n  var gcv = \"__coverage__\";\n  var coverageData = {\n    path: \"/Users/chenweiguang/Documents/\\u6211\\u7684\\u9879\\u76EE/\\u524D\\u7AEF\\u8BAD\\u7EC3\\u8425/\\u8BFE\\u7A0B\\u7B14\\u8BB0/30-\\u7EC4\\u4EF6\\u5316-\\u5927\\u6210/test-demo/src/main.js\",\n    statementMap: {\n      \"0\": {\n        start: {\n          line: 3,\n          column: 18\n        },\n        end: {\n          line: 3,\n          column: 41\n        }\n      },\n      \"1\": {\n        start: {\n          line: 5,\n          column: 0\n        },\n        end: {\n          line: 5,\n          column: 32\n        }\n      }\n    },\n    fnMap: {},\n    branchMap: {},\n    s: {\n      \"0\": 0,\n      \"1\": 0\n    },\n    f: {},\n    b: {},\n    _coverageSchema: \"1a1c01bbd47fc00a2c39e90264f33305004495a9\",\n    hash: \"0dbafc5d0dabef4c384812a37a3269a2be57eb2b\"\n  };\n  var coverage = global[gcv] || (global[gcv] = {});\n\n  if (!coverage[path] || coverage[path].hash !== hash) {\n    coverage[path] = coverageData;\n  }\n\n  var actualCoverage = coverage[path];\n  {\n    // @ts-ignore\n    cov_1k2r24tu3u = function () {\n      return actualCoverage;\n    };\n  }\n  return actualCoverage;\n}\n\ncov_1k2r24tu3u();\n\nvar component = (cov_1k2r24tu3u().s[0]++, Object(_lib_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"div\", null, \"Hello World!\"));\ncov_1k2r24tu3u().s[1]++;\ncomponent.mountTo(document.body);\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });