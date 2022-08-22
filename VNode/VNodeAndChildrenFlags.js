// VNode属性 children childrenFlags
import { VNodeFlags } from './VNodeAndFlags';

// 一个标签的字节点情况
/** 
 * 1. 未知字节点
 * 2. 没有字节点
 * 3. 只有一个字节点
 * 4. 多个字节点
 * 5. 多个字节点:（1）有key的字节点（2）无key的字节点
 **/
const {
  VNodeFlags
} = requried('./VNodeAndFlags.js')
// childrenFlags设计 与flags大致相同 也用位来表示
const ChildrenFlags = {
  // 未知的字节点
  UNKNOWN_CHILDREN: 0,
  // 没有字节点
  NO_CHILDREN: 1,
  // 只有一个字节点
  SINGLE_VNODE: 1 << 1,
  // 有key的多个字节点
  KEYED_VNODES: 1 << 2,
  // 无key的多个字节点
  NO_KEYED_VNODES: 1 << 3,
}
// VNode有一个或多个字节点标识
ChildrenFlags.MULTIPLE_VNODES = ChildrenFlags.KEYED_VNODES | ChildrenFlags.NO_KEYED_VNODES
// 判断一个节点是否为多字节点
// oneVNodes.childrenFlags & ChildrenFlags.MULTIPLE_VNODES

// ex: 1 <div></div>
// VNode:
const VNode1 = {
  tag: 'div',
  data: null,
  flags: VNodeFlags.ELEMENT_HTML,
  children: null,
  childrenFlags: ChildrenFlags.NO_CHILDREN
}
// ex: 2 <div>我是一段文本</div>
const VNode2 = {
  tag: 'div',
  data: null,
  flags: VNodeFlags.ELEMENT_HTML,
  children: '我是一段文本',
  childrenFlags: ChildrenFlags.NO_CHILDREN
}
// ex: 3 <ul><li :key="0"></li><li :key="1"></li></ul>
const VNode3 = {
  tag: 'ul',
  data: null,
  flags: VNodeFlags.ELEMENT_HTML,
  children: [
    {
      tag: 'li',
      data: {
        key: '0'
      },
      flags: VNodeFlags.ELEMENT_HTML,
      children: null,
      childrenFlags: NO_CHILDREN
    },
    {
      tag: 'li',
      data: {
        key: '1'
      },
      flags: VNodeFlags.ELEMENT_HTML,
      children: null,
      childrenFlags: NO_CHILDREN
    }
  ],
  childrenFlags: ChildrenFlags.KEYED_VNODES
}
// ex: 4 <Fragment><p></p></Fragment>
const VNode4 = {
  tag: null,
  data: null,
  flags: VNodeFlags.FRAFMENT,
  children: {
    tag: 'p',
    data: null,
    children: null,
    childrenFlags: ChildrenFlags.NO_CHILDREN
  },
  childrenFlags: ChildrenFlags.SINGLE_VNODE

}