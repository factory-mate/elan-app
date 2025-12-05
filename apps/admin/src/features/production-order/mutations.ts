import { ProductionOrderAPI } from './api'
import {
  type ProductionOrderAddDto,
  type ProductionOrderBOMListEditDto,
  type ProductionOrderEditDto,
  TaskStatus
} from './types'

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

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: ProductionOrderAddDto) => ProductionOrderAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: ProductionOrderEditDto) => ProductionOrderAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditBOMListMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: ProductionOrderBOMListEditDto) => ProductionOrderAPI.editBOMList(data),
    onSuccess: () => showMessage('success')
  })
}
