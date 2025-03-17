import { RoleAPI } from './api'
import type { RoleAddDto, RoleBatchAddDto, RoleEditDto } from './types'

export const useStartMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => RoleAPI.start(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useStopMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => RoleAPI.stop(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => RoleAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: RoleAddDto) => RoleAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: RoleEditDto) => RoleAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}

export const useBatchAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: RoleBatchAddDto) => RoleAPI.batchAdd(data),
    onSuccess: () => showMessage('success')
  })
}
