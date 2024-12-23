import type { Page, PageDto } from '@/features/pagination'

import type { SalesOrderVo } from './types'

export class SalesOrderAPI {
  private static apiPrefix = `${MES_SERVICE_API_PREFIX}/so_main`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<SalesOrderVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async delete(ids: string[], signal?: AbortSignal) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { signal, data: ids })
  }

  static async sync(signal?: AbortSignal) {
    return httpClient.get(`${this.apiPrefix}/AddOnERP`, {}, { signal })
  }
}
