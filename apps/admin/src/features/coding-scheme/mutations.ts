import { CodingSchemeAPI } from './api'
import type { CodingSchemeAddDto, CodingSchemeEditDto } from './types'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => CodingSchemeAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: CodingSchemeAddDto) => CodingSchemeAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: CodingSchemeEditDto) => CodingSchemeAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
