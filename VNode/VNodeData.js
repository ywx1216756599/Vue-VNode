// VNodeData 就是 VNode 数据，用于对 VNode 进行描述
export const VNode =  {
  // _isVNode 属性在上文中没有提到，是一个始终为 true 的值，我们可以判断一个对象是否是 VNode 对象
  _isVNode: true,
  // el 属性在上文中也没有提到，当一个 VNode 被渲染为真实 DOM 之后，el 属性的值会引用该真实DOM
  el: Element | null,
  flags: VNodeFlags,
  tag: string | FunctionalComponent | ComponentClass | null,
  data: VNodeData | null,
  children: VNodeChildren,
  childFlags: ChildrenFlags,
}