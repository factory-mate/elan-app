import type { AuthListDto, PolicyAddDto, PolicyDetailVo, PolicyEditDto, PolicyVo } from './types'

export class PolicyAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<PolicyVo[]>(`${this.apiPrefix}/AUTHPOLICY/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<PolicyVo>>(`${this.apiPrefix}/AUTHPOLICY/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<PolicyVo>(`${this.apiPrefix}/AUTHPOLICY/GetById`, { val }, { signal })
  }

  static async detailList(val: string, signal?: AbortSignal) {
    return httpClient.get<PolicyDetailVo[]>(
      `${this.apiPrefix}/AuthPolicyDetail/GetByMID`,
      { val },
      { signal }
    )
  }

  static async add(data: PolicyAddDto) {
    return httpClient.post(`${this.apiPrefix}/AUTHPOLICY/AddWhole`, data)
  }

  static async edit(data: PolicyEditDto) {
    return httpClient.post(`${this.apiPrefix}/AUTHPOLICY/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/AUTHPOLICY/Del`, { data: ids })
  }

  static async authList(params: AuthListDto, signal?: AbortSignal) {
    return httpClient.get<PolicyDetailVo[]>(`${this.apiPrefix}/PUBLICDIC/GetForList`, params, {
      signal
    })
  }
}
