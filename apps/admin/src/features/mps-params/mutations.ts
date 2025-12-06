import { MpsParamsAPI } from './api'
import type { MpsParamsEditDto } from './types'

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: MpsParamsEditDto) => MpsParamsAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
