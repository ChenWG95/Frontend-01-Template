const set = new Set()
const globalObjects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
]

// 遍历globalObjects找出所有的属性的value，get，set
for (let obj of globalObjects) {
    getObjPrototypes(obj)
}
globalObjects.forEach(o => set.add(o))
function getObjPrototypes (obj) {
    for (let p of Object.getOwnPropertyNames(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, p)

        if ((descriptor.value !== null && typeof descriptor.value === 'object') || (typeof descriptor.value === 'function')) {
            if (!set.has(descriptor.value)) {
                set.add(descriptor.value)
                globalObjects.push(descriptor.value)
            }
        }

        if (descriptor.set) {
            if (!set.has(descriptor.set)) {
                set.add(descriptor.set)
                globalObjects.push(descriptor.set)
            }
        }

        if (descriptor.get) {
            if (!set.has(descriptor.get)) {
                set.add(descriptor.get)
                globalObjects.push(descriptor.get)
            }
        }
    }
}

console.log(set)
