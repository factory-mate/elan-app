import { MainProductionPlanMpsAPI } from './api'
import type { MainProductionPlanMpsComputeDto, MainProductionPlanMpsEditDto } from './types'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => MainProductionPlanMpsAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: MainProductionPlanMpsEditDto) => MainProductionPlanMpsAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}

export const useCancelMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => MainProductionPlanMpsAPI.cancel(ids),
    onSuccess: () => showMessage('success')
  })
}

export const usePushMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => MainProductionPlanMpsAPI.push(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useMpsMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: MainProductionPlanMpsComputeDto) => MainProductionPlanMpsAPI.mps(data),
    onSuccess: () => showMessage('success')
  })
}
