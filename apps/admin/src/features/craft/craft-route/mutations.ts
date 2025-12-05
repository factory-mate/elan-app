import { CraftRouteAPI } from './api'
import type { CraftRouteAddDto, CraftRouteEditDto } from './types'

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => CraftRouteAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: CraftRouteAddDto) => CraftRouteAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: CraftRouteEditDto) => CraftRouteAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}
