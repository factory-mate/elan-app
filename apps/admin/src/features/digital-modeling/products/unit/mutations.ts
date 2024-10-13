import { UnitAPI } from './api'

export const useStartMutation = () => {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: (ids: string[]) => UnitAPI.start(ids),
    onSuccess: () => message.success('操作成功')
  })
}

export const useStopMutation = () => {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: (ids: string[]) => UnitAPI.stop(ids),
    onSuccess: () => message.success('操作成功')
  })
}

export const useDeleteMutation = () => {
  const { message } = App.useApp()
  return useMutation({
    mutationFn: (ids: string[]) => UnitAPI.delete(ids),
    onSuccess: () => message.success('操作成功')
  })
}
