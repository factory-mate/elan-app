import type { MenuVo } from './types'

export class MenusAPI {
  private static apiPrefix = '/manager-center/AuthHelper'

  static async getMenuAuth(signal?: AbortSignal) {
    return httpClient.get<MenuVo[]>(`${this.apiPrefix}/GetMenuAuth`, {}, { signal })
  }
}
