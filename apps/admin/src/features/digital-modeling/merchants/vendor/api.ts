import type { VendorAddDto, VendorEditDto, VendorVo } from './types'

export class VendorAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/vendor`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<VendorVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<VendorVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: VendorAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: VendorEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async start(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Start`, ids)
  }

  static async stop(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Stop`, ids)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }
}
