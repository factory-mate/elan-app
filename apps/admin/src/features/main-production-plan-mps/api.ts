import type {
  MainProductionPlanMpsComputeDto,
  MainProductionPlanMpsEditDto,
  MainProductionPlanMpsVo
} from './types'

export class MainProductionPlanMpsAPI {
  private static apiPrefix = MES_SERVICE_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<MainProductionPlanMpsVo[]>(
      `${this.apiPrefix}/PLANPRODUCTVOUCH/GetForList`,
      {},
      { signal }
    )
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<MainProductionPlanMpsVo>>(
      `${this.apiPrefix}/PLANPRODUCTVOUCH/GetForPage`,
      params,
      {
        signal
      }
    )
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<MainProductionPlanMpsVo>(
      `${this.apiPrefix}/PLANPRODUCTVOUCH/GetById`,
      { val },
      { signal }
    )
  }

  static async edit(data: MainProductionPlanMpsEditDto) {
    return httpClient.post(`${this.apiPrefix}/PLANPRODUCTVOUCH/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/PLANPRODUCTVOUCH/Del`, { data: ids })
  }

  static async cancel(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/PLANPRODUCTVOUCH/CancelPushVouch`, ids)
  }

  static async push(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/PLANPRODUCTVOUCH/PushVouch`, ids)
  }

  static async mps(data: MainProductionPlanMpsComputeDto) {
    return httpClient.post(`${this.apiPrefix}/PLANPRODUCTVOUCH/mps`, data)
  }
}
