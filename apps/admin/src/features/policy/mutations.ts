import { PolicyAPI } from './api'
import type { PolicyAddDto, PolicyEditDto } from './types'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => PolicyAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: PolicyAddDto) => PolicyAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: PolicyEditDto) => PolicyAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
