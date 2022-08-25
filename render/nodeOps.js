function createElement(tag, isSVG) {
  return isSVG ?
    document.createElementNS('http://www.w3.org/2000/svg', tag) :
    document.createElement(tag)
}

function createText(text) {
  return document.createTextNode(text)
}

function setText(node, text) {
  node.nodeValue = text
}

function appendChild(parent, child) {
  parent.appendChild(child)
}

function insertBefore(parent, child, ref) {
  parent.insertBefore(child, ref)
}

function removeChild(parent, child) {
  parent.removeChild(child)
}

function parentNode(node) {
  return node.parentNode
}

function nextSibling(node) {
  return node.nextSibling
}

function querySelector(selector) {
  return document.querySelector(selector)
}
export default {
  createElement,
  createText,
  setText,
  appendChild,
  insertBefore,
  removeChild,
  parentNode,
  nextSibling,
  querySelector
}