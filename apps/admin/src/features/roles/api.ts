import type { RoleAddDto, RoleBatchAddDto, RoleEditDto, RoleVo } from './types'

export class RoleAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<RoleVo[]>(`${this.apiPrefix}/role/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<RoleVo>>(`${this.apiPrefix}/role/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<RoleVo>(`${this.apiPrefix}/role/GetById`, { val }, { signal })
  }

  static async add(data: RoleAddDto) {
    return httpClient.post(`${this.apiPrefix}/role/Add`, data)
  }

  static async edit(data: RoleEditDto) {
    return httpClient.post(`${this.apiPrefix}/role/Edit`, data)
  }

  static async start(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/role/Start`, ids)
  }

  static async stop(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/role/Stop`, ids)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/role/Del`, { data: ids })
  }

  static async batchAdd(data: RoleBatchAddDto) {
    return httpClient.post(`${this.apiPrefix}/UserRole/BatchAdd`, data)
  }

  static async userRoleFullList(params: FullPageDto, signal?: AbortSignal) {
    return httpClient.get<RoleVo[]>(`${this.apiPrefix}/UserRole/GetForList`, params, {
      signal
    })
  }
}
