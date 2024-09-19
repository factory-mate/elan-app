import type { MenuVo } from './types'
import { flattenMenus } from './utils'

export class MenusAPI {
  private static apiPrefix = '/manager-center/AuthHelper'

  static async getMenuAuth(signal?: AbortSignal) {
    try {
      const menus = await httpClient.get<MenuVo[]>(`${this.apiPrefix}/GetMenuAuth`, {}, { signal })
      return flattenMenus(menus)
    } catch {
      return []
    }
  }
}
