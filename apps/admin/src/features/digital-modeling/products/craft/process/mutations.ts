import { ProcessAPI } from './api'
import type { ProcessAddDto, ProcessEditDto } from './types'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => ProcessAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: ProcessAddDto) => ProcessAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: ProcessEditDto) => ProcessAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
