import { SupplierAPI } from './api'
import type { SupplierAddDto, SupplierEditDto } from './types'

export const useStartMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => SupplierAPI.start(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useStopMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => SupplierAPI.stop(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => SupplierAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: SupplierAddDto) => SupplierAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: SupplierEditDto) => SupplierAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
