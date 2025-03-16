import type { ChangePasswordDto } from './types'

export class UsersAPI {
  private static apiPrefix = `${MANAGER_CENTER_API_PREFIX}/User`

  static async changePassword(changePasswordDto: ChangePasswordDto) {
    return httpClient.post(`${this.apiPrefix}/SetPass`, changePasswordDto)
  }

  static async resetPassword(ids: string[]) {
    return httpClient.post(`${this.apiPrefix}/ResetPass`, ids)
  }
}
