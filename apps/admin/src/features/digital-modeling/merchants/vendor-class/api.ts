import type {
  VendorClassAddDto,
  VendorClassEditDto,
  VendorClassTreeItemVo,
  VendorClassVo
} from './types'

export class VendorClassAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/vendorclass`

  static async tree(signal?: AbortSignal) {
    return httpClient.get<VendorClassTreeItemVo[]>(`${this.apiPrefix}/GetTree`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<VendorClassVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<VendorClassVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async add(data: VendorClassAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: VendorClassEditDto) {
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
