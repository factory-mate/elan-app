import type { DictTypeDto, DictVo } from './types'

export class DictsClassAPI {
  private static apiPrefix = `${MANAGE_CENTER_API_PREFIX}/dictonary`

  static async fullList(code: string, signal?: AbortSignal) {
    return httpClient.get<DictVo[]>(
      `${this.apiPrefix}/GetForList`,
      {
        conditions: `cDictonaryTypeCode = ${code}`
      },
      { signal }
    )
  }

  static async dictType(data: DictTypeDto, signal?: AbortSignal) {
    return httpClient.get<DictVo[]>(`${this.apiPrefix}/GetDicType`, data, { signal })
  }
}
