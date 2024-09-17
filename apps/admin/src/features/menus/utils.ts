import type { MenuVo } from './types'

export function flattenMenus(nodes: MenuVo[]): MenuVo[] {
  let result: MenuVo[] = []
  // eslint-disable-next-line no-restricted-syntax
  for (const node of nodes) {
    result.push(node)
    if (node.Child) {
      result = result.concat(flattenMenus(node.Child))
    }
  }
  return result
}
