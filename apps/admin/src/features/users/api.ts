import type { ChangePasswordDto } from './types'

export class UsersAPI {
  private static apiPrefix = '/manager-center/User'

  static async changePassword(changePasswordDto: ChangePasswordDto) {
    return httpClient.post(`${this.apiPrefix}/SetPass`, changePasswordDto)
  }
}
