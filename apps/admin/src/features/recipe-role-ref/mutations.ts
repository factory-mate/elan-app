import { RecipeRoleRefAPI } from './api'
import type { RecipeRoleRefAddDto, RecipeRoleRefEditDto } from './types'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => RecipeRoleRefAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: RecipeRoleRefAddDto) => RecipeRoleRefAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: RecipeRoleRefEditDto) => RecipeRoleRefAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
