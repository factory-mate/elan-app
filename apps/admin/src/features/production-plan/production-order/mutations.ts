import { ProductionOrderAPI } from './api'
import { TaskStatus } from './types'

export const useAuditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => ProductionOrderAPI.setStatus(ids, TaskStatus.AUDIT),
    onSuccess: () => showMessage('success')
  })
}

export const useAbandonMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => ProductionOrderAPI.setStatus(ids, TaskStatus.ABANDON),
    onSuccess: () => showMessage('success')
  })
}

export const useOpenMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => ProductionOrderAPI.setStatus(ids, TaskStatus.OPEN),
    onSuccess: () => showMessage('success')
  })
}

export const useCloseMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => ProductionOrderAPI.setStatus(ids, TaskStatus.CLOSE),
    onSuccess: () => showMessage('success')
  })
}

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => ProductionOrderAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}
