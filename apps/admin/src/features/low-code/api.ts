import { transformConfig } from './transformer'
import type { LowCodeConfigVo } from './types'

export class LowCodeAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/AuthHelper`

  static async getConfig(params: { modelCode: string }, signal: AbortSignal) {
    const data = await httpClient.get<LowCodeConfigVo[]>(`${this.apiPrefix}/GetFormParm`, params, {
      signal
    })
    return transformConfig(data)
  }
}
