import { SupplierClassAPI } from './api'
import type { SupplierClassAddDto, SupplierClassEditDto } from './types'

export const useStartMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => SupplierClassAPI.start(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useStopMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => SupplierClassAPI.stop(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => SupplierClassAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: SupplierClassAddDto) => SupplierClassAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: SupplierClassEditDto) => SupplierClassAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
