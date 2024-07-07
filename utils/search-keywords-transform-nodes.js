function searchKeywordsTransformNodes(keywords, value) {
  const nodes = []
  if (keywords.toUpperCase().startsWith(value.toUpperCase())) {
    const key1 = keywords.slice(0, value.length)
    const node1 = {
      name: 'span',
      attrs: {
        style: "color: #26ce8a; font-size: 14px;"
      },
      children: [{
        type: 'text',
        text: key1
      }]
    }
    nodes.push(node1)

    const key2 = keywords.slice(value.length)
    const node2 = {
      name: 'span',
      attrs: {
        style: "color: #333333; font-size: 14px;"
      },
      children: [{
        type: "text",
        text: key2
      }]
    }
    nodes.push(node2)
  } else {
    const node3 = {
      name: 'span',
      attrs: {
        style: "color: #333333; font-size: 14px;"
      },
      children: [{
        type: "text",
        text: keywords
      }]
    }
    nodes.push(node3)
  }

  return nodes
}

export {searchKeywordsTransformNodes}