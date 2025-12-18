import { RecipeEmployeeRefAPI } from './api'
import type { RecipeEmployeeRefAddDto, RecipeEmployeeRefEditDto } from './types'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => RecipeEmployeeRefAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: RecipeEmployeeRefAddDto) => RecipeEmployeeRefAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: RecipeEmployeeRefEditDto) => RecipeEmployeeRefAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
