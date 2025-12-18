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
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }

  static async printDetail(val: string, signal?: AbortSignal) {
    return httpClient.get<PrintDetailVo[]>(`${this.apiPrefix}/GetPrintData`, { val }, { signal })
  }
}
