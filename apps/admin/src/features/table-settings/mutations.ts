import { TableSettingAPI } from './api'
import type { TableSettingAddDto } from './types'

export const useClearMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (key: string) => TableSettingAPI.clear(key),
    onSuccess: () => showMessage('success')
  })
}

export const useSaveMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: TableSettingAddDto) => TableSettingAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useClearAllMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: () => TableSettingAPI.clearAll(),
    onSuccess: () => showMessage('success')
  })
}
