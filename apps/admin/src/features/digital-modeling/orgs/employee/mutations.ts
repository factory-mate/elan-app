import { EmployeeAPI } from './api'
import type { EmployeeAddDto, EmployeeEditDto, EmployeeUpdateDeptDto } from './types'

export const useStartMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => EmployeeAPI.start(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useStopMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => EmployeeAPI.stop(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useDeleteMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => EmployeeAPI.delete(ids),
    onSuccess: () => showMessage('success')
  })
}

export const useAddMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: EmployeeAddDto) => EmployeeAPI.add(data),
    onSuccess: () => showMessage('success')
  })
}

export const useEditMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: EmployeeEditDto) => EmployeeAPI.edit(data),
    onSuccess: () => showMessage('success')
  })
}

export const useUpdateDeptMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: EmployeeUpdateDeptDto) => EmployeeAPI.changeParent(data),
    onSuccess: () => showMessage('success')
  })
}

export const useFreezeMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => EmployeeAPI.setFreezeStatus({ UID: ids, bFreeze: true }),
    onSuccess: () => showMessage('success')
  })
}

export const useUnfreezeMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (ids: string[]) => EmployeeAPI.setFreezeStatus({ UID: ids, bFreeze: false }),
    onSuccess: () => showMessage('success')
  })
}
