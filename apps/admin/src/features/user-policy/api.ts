import type {
  UserPolicyAddDto,
  UserPolicyBatchAddDto,
  UserPolicyEditDto,
  UserPolicyVo
} from './types'

export class UserPolicyAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<UserPolicyVo[]>(`${this.apiPrefix}/USERPOLICY/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<UserPolicyVo>>(`${this.apiPrefix}/USERPOLICY/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<UserPolicyVo>(`${this.apiPrefix}/USERPOLICY/GetById`, { val }, { signal })
  }

  static async add(data: UserPolicyAddDto) {
    return httpClient.post(`${this.apiPrefix}/USERPOLICY/Add`, data)
  }

  static async batchAdd(data: UserPolicyBatchAddDto) {
    return httpClient.post(`${this.apiPrefix}/USERPOLICY/BatchAdd`, data)
  }

  static async edit(data: UserPolicyEditDto) {
    return httpClient.post(`${this.apiPrefix}/USERPOLICY/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/USERPOLICY/Del`, { data: ids })
  }
}
