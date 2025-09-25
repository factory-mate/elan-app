import type { ListVo } from './types'

export class ProductionDateDiffAPI {
  private static apiPrefix = `${MES_SERVICE_API_PREFIX}/CPZS`

  static async getList(data: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<ListVo>>(`${this.apiPrefix}/GetForPage`, data, { signal })
  }
}
