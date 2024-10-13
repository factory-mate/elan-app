import type { Page, PageDto } from '@/features/pagination'

export class UnitAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/unit`

  static async list(params: PageDto, signal?: AbortSignal) {
    return httpClient.post<Page>(`${this.apiPrefix}/GetForPage`, params, { signal })
  }

  static async start(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Start`, ids)
  }

  static async stop(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/Stop`, ids)
  }

  static async delete(ids: string[]) {
    return httpClient.delete(`${this.apiPrefix}/Del`, { data: ids })
  }
}
