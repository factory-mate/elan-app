import type { MenuAddDto, MenuEditDto, MenuVo } from './types'

export class MenuAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/menu`

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<MenuVo[]>(`${this.apiPrefix}/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<MenuVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<MenuVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: MenuAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: MenuEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }
}
