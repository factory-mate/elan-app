import type { FullPageDto } from '@/shared/types'

import type { PermTreeItemVo, PermVo, SetPermsDto } from './types'

export class PermAPI {
  private static apiPrefix = MANAGER_CENTER_API_PREFIX

  static async getPermsByRoleCode(params: FullPageDto) {
    return httpClient.get<PermVo[]>(`${this.apiPrefix}/RoleAuth/GetForList`, params)
  }

  static async getPermsTree() {
    return httpClient.get<PermTreeItemVo[]>(`${this.apiPrefix}/AuthHelper/GetAuthTreeAll`)
  }

  static async setPerms(data: SetPermsDto) {
    return httpClient.post(`${this.apiPrefix}/roleAuth/Add`, data)
  }
}
