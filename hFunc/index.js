import flags from '../VNode/VNodeAndFlags.js';
import childrenFlags from '../VNode/VNodeAndChildrenFlags.js';

const VNodeFlags = flags.VNodeFlags
const ChildrenFlags = childrenFlags.ChildrenFlags

// 简单的h函数模型
function hDemo() {
  return {
    _isVNode: null,
    el: null,
    flags: '',
    tag: '',
    data: '',
    children: '',
    childFlags: '',
  }
}

// h函数 接受tag data children 就能正确的返回一个 VNodeData
// Fragment标识
export const Fragment = Symbol('Fragment')
// Portal标识
export const Portal = Symbol('Portal')
export function h(tag, data = null, children = null) {
  // 设置每个VNode的flags
  // 有tag的情况下 切tag为string类型 ---> html/svg
  console.log(tag === Fragment,tag === Portal)
  let flags = null
  if (typeof tag === 'string') {
    flags = tag === 'svg' ? VNodeFlags.ELEMENT_SVG : VNodeFlags.ELEMENT_HTML
  } else if (tag === Fragment) {
    flags = VNodeFlags.FRAGMENT
  } else if (tag === Portal) {
    flags = VNodeFlags.PORTAL
    tag = data && data.target
  } else {
    // 兼容Vue2.x对象式组件
    if (tag !== null && typeof tag === 'object') {
      flags = tag.functional ?
        VNodeFlags.COMPONENT_FUNCTIONAL :
        VNodeFlags.COMPONENT_STATEFUL_NORMAL
    } else if (typeof tag === 'function') {
      flags = tag.prototype && tag.prototype.render ?
        VNodeFlags.COMPONENT_STATEFUL_NORMAL :
        VNodeFlags.COMPONENT_FUNCTIONAL
    }
  }
  // 设置每个VNode的childrenFlags
  // children的四种情况 1. 是一个数组 2. 是一个VNodeData 3. 没有 4. 文本
  let childFlags = null
  if (children instanceof Array) {
    if (children.length === 0) {
      // 无子节点
      childFlags = ChildrenFlags.NO_CHILDREN
    } else if (children.length === 1) {
      // 一个子节点
      childFlags = ChildrenFlags.SINGLE_VNODE
    } else {
      // 多个子节点
      const keys = children.map(i => i.key).filter(Boolean)
      if (keys.length) {
        // 有key
        childrenFlags = ChildrenFlags.KEYED_VNODES
      } else {
        // 无key
        childrenFlags = ChildrenFlags.NO_KEYED_VNODES
      }
      children = setChildrenVNodes(children)
    }
    // 无子节点
  } else if (!children) {
    childFlags = ChildrenFlags.NO_CHILDREN
    // 一个字节点 children为对象时
  } else if (children._isVNode) {
    childFlags = ChildrenFlags.SINGLE_VNODE
  } else {
    // 文本节点
    childFlags = ChildrenFlags.SINGLE_VNODE
    children = setTextVNode(String(children))
  }
  const VNodeData = {
    tag,
    flags,
    _isVNode: true,
    el: null,
    childFlags
  }
  VNodeData.data = data
  VNodeData.children = children
  return VNodeData

}

function setChildrenVNodes(children) {
  const newChildren = []
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.key !== 0 && !child.key) {
      child.key = '|' + i
    }
    newChildren.push(child)
  }
  return newChildren
}

function setTextVNode(children) {
  return {
    _isVNode: true,
    el: null,
    flags: VNodeFlags.TEXT,
    tag: null,
    data: null,
    children,
    childFlags: ChildrenFlags.NO_CHILDREN,
  }
}