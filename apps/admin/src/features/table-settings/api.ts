import type { TableSettingAddDto, TableSettingVo } from './types'

export class TableSettingAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<TableSettingVo[]>(
      `${this.apiPrefix}/SYS_COLUMNORDER_SET/GetForList`,
      {},
      { signal }
    )
  }

  static async add(data: TableSettingAddDto) {
    return httpClient.post(`${this.apiPrefix}/SYS_COLUMNORDER_SET/Add`, data)
  }

  static async clear(key: string) {
    return httpClient.delete(`${this.apiPrefix}/SYS_COLUMNORDER_SET/DelByKey`, {
      data: key
    })
  }

  static async clearAll() {
    return httpClient.delete(`${this.apiPrefix}/SYS_COLUMNORDER_SET/DelAll`)
  }
}
