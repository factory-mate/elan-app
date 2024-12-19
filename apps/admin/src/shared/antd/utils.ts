export function onlyCanSelectTreeLeafNode<T>(treeData: T[], fieldName = 'Child') {
  function traverse(data: T[]) {
    data.forEach((item: any) => {
      if (item[fieldName]) {
        item.selectable = false
        traverse(item[fieldName])
      }
    })
  }
  traverse(treeData)
  return treeData
}
