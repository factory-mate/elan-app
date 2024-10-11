import type { PageParams, PageResponse } from '../pagination'
import { transformConfig } from './transformer'
import type { LowCodeConfigVo, LowCodePageQueryConfig } from './types'

export class LowCodeAPI {
  private static apiPrefix = '/manager-center'

  static async getConfig(params: { modelCode: string }, signal: AbortSignal) {
    const data = await httpClient.get<LowCodeConfigVo[]>(
      `${this.apiPrefix}/AuthHelper/GetFormParm`,
      params,
      {
        signal
      }
    )
    return transformConfig(data)
  }

  static async getList<T = unknown>(
    config: LowCodePageQueryConfig,
    params: PageParams,
    signal: AbortSignal
  ) {
    return httpClient.request<PageResponse<T>>({
      method: config.method,
      url: `${this.apiPrefix}${config.url}`.replace('/api', ''),
      params: config.method?.toLowerCase() === 'get' ? params : undefined,
      data: config.method?.toLowerCase() === 'post' ? params : undefined,
      signal
    })
  }
}
