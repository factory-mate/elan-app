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
