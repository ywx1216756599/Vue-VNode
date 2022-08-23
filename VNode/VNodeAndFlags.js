// 使用flags作为VNode的标识

// 给VNode添加flags 也是Virtual DOM算法的优化手段之一
// Vue2.0中 区分VNode是组件 html元素 还是文本 主要的方法是：
// 1. 先将VNode当组件去处理 如果成功的创建了组件 那就是组件 否则就是其他
// 2. 在看看VNode中tag是否有定义 有的话就是html元素
// 3. 如果tag没有定义 在判断是否是注释节点
// 4. 都不是则为文本节点
// 这些都只能在挂载阶段才能明白是什么元素 在VNode定义的时候不知道是什么种类

// 我的思路是在 VNode创建的时候就把该VNode的类型通过flags标明
// 枚举值 VNodeFlags
// 将VNode的种类 设计为一个对象 flags值采用位运算方式
 const VNodeFlags = {
  // html标签
  ELEMENT_HTML: 1, //0000 0000 0001 1
  // svg图片 
  ELEMENT_SVG: 1 << 1, // 0000 0000 0010 2
  // 组件-普通有状态组件
  COMPONENT_STATEFUL_NORMAL: 1 << 2, // 0000 0000 0100 4
  // 组件-需要被keep-Alive的有状态组件
  COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE: 1 << 3, // 0000 0000 1000 8
  // 组件-已经被keep-Alive的有状态组件
  COMPONENT_STATEFUL_KEPT_ALIVE: 1 << 4, // 0000 0001 0000 16
  // 组件-函数时组件
  COMPONENT_FUNCTIONAL: 1 << 2, // 0000 0010 0000 32
  // 纯文本
  TEXT: 1 << 2, // 0000 0100 0000 64
  // Fragment
  FRAGMENT: 1 << 2, // 0000 1000 0000 128
  // Portal
  PORTAL: 1 << 2, // 0001 0000 0000 256
}
// 有了这些flags之后，我们在创建VNode的时候就可以预先为其打上flags，以标明该VNode的类型
// html
const VNode1 = {
  tag: 'div',
  data: null,
  flags: VNodeFlags.ELEMENT_HTML
}
// svg
const VNode2 = {
  tag: 'svg',
  data: null,
  flags: VNodeFlags.ELEMENT_SVG
}
// Fragment
const VNode3 = {
  flags: VNodeFlags.FRAGMENT,
  // 注意，由于 flags 的存在，我们已经不需要使用 tag 属性来存储唯一标识
  tag: null
}

// Portal
const VNode4 = {
  flags: VNodeFlags.PORTAL,
  // 注意，由于 flags 的存在，我们已经不需要使用 tag 属性来存储唯一标识，tag 属性用来存储 Portal 的 target
  tag: null
}

export default {
  VNodeFlags
}
