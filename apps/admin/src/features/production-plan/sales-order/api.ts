import type { Page, PageDto } from '@/features/pagination'

import type { SalesOrderVo } from './types'

export class SalesOrderAPI {
  private static apiPrefix = `${MES_SERVICE_API_PREFIX}/so_main`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<SalesOrderVo>>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }
}
