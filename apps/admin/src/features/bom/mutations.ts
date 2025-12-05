import { BOMAPI } from './api'
import { TaskStatus } from './enums'
import type { BOMAddDto, BOMEditDto } from './types'

export const useStartMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => BOMAPI.start(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useStopMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => BOMAPI.stop(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => BOMAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: BOMAddDto) => BOMAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: BOMEditDto) => BOMAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}

export const useAuditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => BOMAPI.setStatus(ids, TaskStatus.AUDIT),
    onSuccess: () => showMessage('success')
  })
}

export const useCancelMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => BOMAPI.setStatus(ids, TaskStatus.CANCEL),
    onSuccess: () => showMessage('success')
  })
}

export const useExportMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: FullPageDto) => BOMAPI.export(data),
    onSuccess: (res) => {
      downloadExcel(res)
      showMessage('export-success')
    }
  })
}

export const useImportMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: FormData) => BOMAPI.import(data),
    onSuccess: () => showMessage('success')
  })
}
