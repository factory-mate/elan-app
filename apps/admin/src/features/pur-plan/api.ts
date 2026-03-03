import type { PurPlanVo } from './types'

export class PurPlanAPI {
  private static apiPrefix = `${MES_SERVICE_API_PREFIX}/PURPLAN`

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<PurPlanVo[]>(`${this.apiPrefix}/GetForList`, {}, { signal })
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<PurPlanVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<PurPlanVo>(`${this.apiPrefix}/GetById`, { val }, { signal })
  }

  static async check() {
    return httpClient.post(`${this.apiPrefix}/Check`)
  }

  static async execute() {
    return httpClient.post(`${this.apiPrefix}/Excute`)
  }

  static async lock(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Lock`, { KeyVal: ids })
  }

  static async sync(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Sync`, { KeyVal: ids })
  }
}
