import { PermAPI } from './api'
import type { SetPermsDto } from './types'

export const useSetPermsMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: SetPermsDto) => PermAPI.setPerms(data),
    onSuccess: () => showMessage('success')
  })
}
