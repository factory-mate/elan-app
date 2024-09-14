import type { LoginDto, LoginVo } from './types'

export class AuthAPI {
  private static apiPrefix = '/manager-center/Login'

  static async login(loginDto: LoginDto) {
    return httpClient.post<LoginVo>(`${this.apiPrefix}/LoginIn`, loginDto)
  }

  static async logout() {
    return httpClient.get(`${this.apiPrefix}/LoginOut`)
  }
}
