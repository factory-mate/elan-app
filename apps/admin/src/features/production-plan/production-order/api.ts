import type { Page, PageDto } from '@/features/pagination'

import type { ProductionOrderAddDto, ProductionOrderEditDto, ProductionOrderVo } from './types'

export class ProductionOrderAPI {
  private static apiPrefix = `${MES_SERVICE_API_PREFIX}/product_vouch`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<ProductionOrderVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async add(data: ProductionOrderAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: ProductionOrderEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async setStatus(ids: string[], status: number) {
    return httpClient.post(`${this.apiPrefix}/SetStatus`, {
      KeyVal: ids,
      iStatus: status
    })
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }
}
