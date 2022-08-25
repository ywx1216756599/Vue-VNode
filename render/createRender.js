// 自定义渲染器
// 将VNode渲染成真实的DOM对象 
// DOM操作中用到的接口
// 1. document.createElement/createElemenNS   创建标签元素
// 2. document.createTextNode   创建文本元素
// 3. el.nodeValue 修改文本元素的内容
// 4. el.removeChild 删除DOM元素
// 5. el.insertBefore 插入DOM元素
// 6. el.appendChild 追加DOM元素
// 7. el.parentNode 获取到父元素
// 8. el.nextSibing 获取到下一个兄弟元素
// 9. document.querySelector 查询元素 Portal中的挂载点
import flags from '../VNode/VNodeAndFlags.js'
import child from '../VNode/VNodeAndChildrenFlags.js'
const domPropsRE = /\[A-Z]|^(?:value|checked|selected|muted)$/
const VNodeFlags = flags.VNodeFlags
console.log(child)
const ChildrenFlags = child.ChildrenFlags
export default function createRenderer(options) {
  const {
    nodeOps: {
      createElement: platformCreateElement,
      createText: platformCreateText,
      setText: platformSetText,
      appendChild: platformAppendChild,
      insertBefore: platformInsertBefore,
      removeChild: platformRemoveChild,
      parentNode: platformParentNode,
      nextSibling: platformNextSibling,
      querySelector: platformQuerySelector
    },
    patchData: platformPatchData
  } = options

  function render(vnode, container) {
    const preVNode = container.vnode
    if (!preVNode) {
      if (vnode) {
        mount(vnode, container)
        container.vnode = vnode
      }
    } else {
      if (vnode) {
        patch(vnode, container)
        container.vnode = vnode
      } else {
        platformRemoveChild(container, prevVNode.el)
        container.vnode = null
      }
    }
  }

  // ========== 挂载 ==========

  function mount(vnode, container, isSVG) {
    const {
      flags
    } = vnode
    if (flags & VNodeFlags.ELEMENT) {
      mountElement(vnode, container, isSVG)
    }
  }

  function mountElement(vnode, container, isSVG, refNode) {
    isSVG = isSVG || vnode.flags & VNodeFlags.ELEMENT_SVG
    const el = platformCreateElement(vnode.tag, isSVG)
    const data = vnode.data
    if (data) {
      for (let key in data) {
        switch (key) {
          case 'style':
            for (let i in data.style) {
              el.style[i] = data.style[i]
            }
            break
          case 'class':
            if (data.class && typeof data.class === 'object') {
              if (data.class instanceof Array) {
                data.class.forEach(i => {
                  if (typeof i === 'string') {
                    if (el.className) {
                      el.className = el.className + ' ' + i
                    } else {
                      el.className = i
                    }
                  } else if (i && typeof i === 'object') {
                    for (let innerKey in i) {
                      if (i[innerKey]) {
                        if (el.className) {
                          el.className = el.className + ' ' + innerKey
                        } else {
                          el.className = innerKey
                        }
                      }
                    }
                  }
                })
              } else {
                for (let classKey in data.class) {
                  if (data.class[classKey]) {
                    if (el.className) {
                      el.className = el.className + ' ' + classKey
                    } else {
                      el.className = classKey
                    }
                  }
                }
              }
            } else if (data.class && typeof data.class === 'string') {
              el.className = data.class
            }
            break
          default:
            if (domPropsRE.test(key)) {
              // 当作 DOM Prop 处理
              el[key] = data[key]
            } else {
              // 当作 Attr 处理
              el.setAttribute(key, data[key])
            }
            break
        }
      }
    }

    const children = vnode.children
    const ChildFlags = vnode.ChildrenFlags
    if (children) {
      if (ChildFlags !== ChildrenFlags.NO_CHILDREN) {
        if (ChildFlags === ChildrenFlags.SINGLE_VNODE) {
          if (children instanceof Array) {
            mount(children[0], el, isSVG)
          } else {
            mount(children, el, isSVG)
          }
        } else if (ChildFlags & ChildrenFlags.MULTIPLE_VNODES) {
          for (let i = 0; i < children.length; i++) {
            mount(children[i], el, isSVG)
          }
        }
      }
    }
    vnode.el = el
    container.appendChild(el)
  }

  function mountText(vnode, container) {
    /* ... */
  }

  function mountFragment(vnode, container, isSVG) {
    /* ... */
  }

  function mountPortal(vnode, container) {
    /* ... */
  }

  function mountComponent(vnode, container, isSVG) {
    /* ... */
  }

  function mountStatefulComponent(vnode, container, isSVG) {
    /* ... */
  }

  function mountFunctionalComponent(vnode, container, isSVG) {
    /* ... */
  }

  // ========== patch ==========

  function patch(prevVNode, nextVNode, container) {
    /* ... */
  }

  function replaceVNode(prevVNode, nextVNode, container) {
    /* ... */
  }

  function patchElement(prevVNode, nextVNode, container) {
    /* ... */
  }

  function patchChildren(
    prevChildFlags,
    nextChildFlags,
    prevChildren,
    nextChildren,
    container
  ) {
    /* ... */
  }

  function patchText(prevVNode, nextVNode) {
    /* ... */
  }

  function patchFragment(prevVNode, nextVNode, container) {
    /* ... */
  }

  function patchPortal(prevVNode, nextVNode) {
    /* ... */
  }

  function patchComponent(prevVNode, nextVNode, container) {
    /* ... */
  }

  return {
    render
  }
}