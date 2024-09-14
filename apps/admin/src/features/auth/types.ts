export interface LoginDto {
  cLoginName: string
  cPassWord: string
  cSourceAppType: string
}

export interface LoginFormValues extends LoginDto {
  remember: boolean
}

export interface LoginVo {
  expires_in: number
  success: boolean
  token: string
  token_type: string
  token_user: UserInfoVo
}

export interface UserInfoVo {
  UserCode: string
  UserId: string
  UserName: string
}
