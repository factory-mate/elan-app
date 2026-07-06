import type { AxiosResponse } from 'axios'

import type {
  BOMItemVo,
  PrintDetailVo,
  ProductionOrderAddDto,
  ProductionOrderBody,
  ProductionOrderBOMListEditDto,
  ProductionOrderEditDto,
  ProductionOrderVo
} from './types'

export class ProductionOrderAPI {
  private static apiPrefix = `${MES_SERVICE_API_PREFIX}/product_vouch`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<ProductionOrderVo>>(`${this.apiPrefix}/GetForPage`, params, {
      signal
    })
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<ProductionOrderVo>(`${this.apiPrefix}/GetBodyByUID`, { val }, { signal })
  }

  static async detailBodys(val: string, signal?: AbortSignal) {
    return httpClient.get<ProductionOrderBody[]>(
      `${this.apiPrefix}/GetListBodysByMID`,
      { val },
      { signal }
    )
  }

  static async add(data: ProductionOrderAddDto) {
    return httpClient.post(`${this.apiPrefix}/Add`, data)
  }

  static async edit(data: ProductionOrderEditDto) {
    return httpClient.post(`${this.apiPrefix}/Edit`, data)
  }

  static async bomList(val: string, signal?: AbortSignal) {
    return httpClient.get<BOMItemVo[]>(`${this.apiPrefix}/GetListBOM`, { val }, { signal })
  }

  static async editBOMList(data: ProductionOrderBOMListEditDto) {
    return httpClient.post(`${this.apiPrefix}/SaveBOM`, data)
  }

  static async setStatus(ids: string[], status: number) {
    return httpClient.post(`${this.apiPrefix}/SetStatus`, {
      KeyVal: ids,
      iStatus: status
    })
  }

  static async setCloseStatus(ids: string[], status: number) {
    return httpClient.post(`${this.apiPrefix}/SetCloseStatus`, {
      KeyVal: ids,
      iStatus: status
    })
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del_Body`, { data: ids })
  }

  static async printDetail(ids: string[], signal?: AbortSignal) {
    return httpClient.post<PrintDetailVo[]>(`${this.apiPrefix}/GetPrintData`, ids, { signal })
  }

  static async export(data: PageDto) {
    return httpClient.post<AxiosResponse<BlobPart>>(`${this.apiPrefix}/ExportDetail`, data, {
      responseType: 'blob'
    })
  }

  static async push(val: string) {
    return httpClient.get<ProductionOrderVo>(`${this.apiPrefix}/MaterialAppVouch`, { val })
  }
}
