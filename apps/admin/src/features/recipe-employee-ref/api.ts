import type {
  RecipeEmployeeRefAddDto,
  RecipeEmployeeRefEditDto,
  RecipeEmployeeRefVo
} from './types'

export class RecipeEmployeeRefAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<RecipeEmployeeRefVo[]>(
      `${this.apiPrefix}/mes_bom_employee/GetForList`,
      {},
      { signal }
    )
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<RecipeEmployeeRefVo>>(
      `${this.apiPrefix}/mes_bom_employee/GetForPage`,
      params,
      {
        signal
      }
    )
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<RecipeEmployeeRefVo>(
      `${this.apiPrefix}/mes_bom_employee/GetById`,
      { val },
      { signal }
    )
  }

  static async add(data: RecipeEmployeeRefAddDto) {
    return httpClient.post(`${this.apiPrefix}/mes_bom_employee/Add`, data)
  }

  static async edit(data: RecipeEmployeeRefEditDto) {
    return httpClient.post(`${this.apiPrefix}/mes_bom_employee/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/mes_bom_employee/Del`, { data: ids })
  }
}
