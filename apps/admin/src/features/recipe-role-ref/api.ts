import type { RecipeRoleRefAddDto, RecipeRoleRefEditDto, RecipeRoleRefVo } from './types'

export class RecipeRoleRefAPI {
  private static apiPrefix = MANAGE_CENTER_API_PREFIX

  static async fullList(signal?: AbortSignal) {
    return httpClient.get<RecipeRoleRefVo[]>(
      `${this.apiPrefix}/mes_bom_role/GetForList`,
      {},
      { signal }
    )
  }

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page<RecipeRoleRefVo>>(
      `${this.apiPrefix}/mes_bom_role/GetForPage`,
      params,
      {
        signal
      }
    )
  }

  static async detail(val: string, signal?: AbortSignal) {
    return httpClient.get<RecipeRoleRefVo>(
      `${this.apiPrefix}/mes_bom_role/GetById`,
      { val },
      { signal }
    )
  }

  static async add(data: RecipeRoleRefAddDto) {
    return httpClient.post(`${this.apiPrefix}/mes_bom_role/Add`, data)
  }

  static async edit(data: RecipeRoleRefEditDto) {
    return httpClient.post(`${this.apiPrefix}/mes_bom_role/Edit`, data)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/mes_bom_role/Del`, { data: ids })
  }
}
