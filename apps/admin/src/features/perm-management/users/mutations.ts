import { UsersAPI } from './api'
import type { ChangePasswordDto } from './types'

export const useChangePasswordMutation = () => {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: (changePasswordDto: ChangePasswordDto) =>
      UsersAPI.changePassword(changePasswordDto),
    onSuccess: () => message.success('修改密码成功')
  })
}

export const useResetPasswordMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => UsersAPI.resetPassword(ids),
    onSuccess: () => showMessage('success')
  })
}
