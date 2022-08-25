import createRenderer from './createRender.js'
import nodeOps from './nodeOps.js'
const { render } = createRenderer({
  nodeOps,
  patchData: {}
})

export default render