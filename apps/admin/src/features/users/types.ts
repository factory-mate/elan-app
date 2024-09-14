export interface ChangePasswordDto {
  UID?: string
  cPassWordOld: string
  cPassWordNew: string
}

export interface ChangePasswordFormValues extends ChangePasswordDto {
  userName: string
  confirmPassword: string
}
