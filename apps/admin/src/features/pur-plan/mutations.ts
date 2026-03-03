import { PurPlanAPI } from './api'

export const useCheckMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: () => PurPlanAPI.check(),
    onSuccess: () => showMessage('success')
  })
}

export const useExecuteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: () => PurPlanAPI.execute(),
    onSuccess: () => showMessage('success')
  })
}

export const useLockMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => PurPlanAPI.lock(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useSyncMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: any) => PurPlanAPI.sync(data),
    onSuccess: () => showMessage('success')
  })
}
