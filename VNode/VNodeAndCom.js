// VNode描述抽象内容

// ex: 1 在jsx中使用了一个MyCom组件
// <div><my-com></my-com></div>
// VNode:
// 得出结论：可以用tag来区分是否是字符串来区分VNode是否是一个普通的标签
const elementVNode1 = {
  tag: 'div',
  data: null,
  children: {
    tag: MyCom,
    data: null
  }
}
// ex: 2 Fragment的用法 Fragment: 渲染一个片段（多个根节点）
// 当渲染器在渲染 VNode 时，如果发现该 VNode 的类型是 Fragment，就只需要把该 VNode 的子节点渲染到页面。
//  <table> <tr> <Columns /> </tr> </table>
//  Columns: <td></td><td></td>
// VNode: 
const Fragment = Symbol()
const elementVNode2 = {
  tag: Fragment,
  data: null,
  children: [
    {
      tag: 'td',
      data: null
    },
    {
      tag: 'td',
      data: null
    }
  ]
}
// ex: 3 Portal的用法 Portal: 将一个Html片段渲染到一个节点上
// 将某个div 渲染到系统根节点上（#app）
// html： <div id="app"><div class="text"></div></div>
// Portal: <Portal target="#app"><div class="text"></div></Portal>
// VNode: 
const Portal = Symbol()
const elementVNode3 = {
  tag: Portal,
  data: {
    target: '#app',
  },
  children: {
    tag: 'div',
    data: {
      class: 'text'
    }
  }
}
