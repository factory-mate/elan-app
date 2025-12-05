import { SalesOrderAPI } from './api'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => SalesOrderAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useSyncMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: () => SalesOrderAPI.sync(),
    onSuccess: () => showMessage('success')
  })
}
