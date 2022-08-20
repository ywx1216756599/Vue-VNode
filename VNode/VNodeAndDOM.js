// VNode描述真实的DOM

// ex: 1 一个背景为红色，长宽为100px的div
// html: <div style="width :100px;height: 100px;background-color: red"></div>
// VNode:
const elementVNode1 = {
  tag: 'div',
  data: {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  }
}

// ex:2 一个div下有个span标签
// html: <div><span></span></div>
// VNode: 
const elementVNode2 = {
  tag: 'div',
  data: null,
  children: {
    tag: 'sapn',
    data: null
  }
}

// ex:3 一个div下有两个span标签
// html: <div><span></span><span></span></div>
// VNode: 
const elementVNode3 = {
  tag: 'div',
  data: null,
  children: [{
      tag: 'sapn',
      data: null
    },
    {
      tag: 'sapn',
      data: null
    },
  ]
}
// ex:4 一个div下有一段字：这是一段文字
// html: <div>这是一段文字</div>
// VNode: 
const elementVNode4 = {
  tag: 'div',
  data: null,
  children: {
    tag: null,
    data: null,
    children: '这是一段文字'
  }
}