import { BOMChangeAPI } from './api'
import type { BOMChangeReplaceDto } from './types'

export const useReplaceMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: BOMChangeReplaceDto) => BOMChangeAPI.replace(data),
    onSuccess: () => showMessage('success')
  })
}
