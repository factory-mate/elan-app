import type { LowCodeConfigVo } from './types'

export class LowCodeAPI {
  private static apiPrefix = '/manager-center/AuthHelper'

  static async getConfig(params: { modelCode: string }, signal: AbortSignal) {
    return httpClient.get<LowCodeConfigVo>(`${this.apiPrefix}/GetFormParm`, params, { signal })
  }
}
