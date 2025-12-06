import type { CraftRouteAddDto, CraftRouteEditDto, CraftRouteVo } from './types'

export class CraftRouteAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<CraftRouteVo[]>(
      `${this.apiPrefix}/product_craftroute/GetForList`,
      {},
      { signal }
    )
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<CraftRouteVo>>(
      `${this.apiPrefix}/product_craftroute/GetForPage`,
      params,
      {
        signal
      }
    )
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<CraftRouteVo>(
      `${this.apiPrefix}/product_craftroute/GetById`,
      { val },
      { signal }
    )
  }

  static async add(data: CraftRouteAddDto) {
    return httpClient.post(`${this.apiPrefix}/product_craftroute/Add`, data)
  }

  static async edit(data: CraftRouteEditDto) {
    return httpClient.post(`${this.apiPrefix}/product_craftroute/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/product_craftroute/Del`, { data: ids })
  }
}
