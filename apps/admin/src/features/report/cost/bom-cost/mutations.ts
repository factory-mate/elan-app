import { BOMCostAPI } from './api'
import type { BOMCostDto } from './types'

export const useExportMutation = (data: BOMCostDto) => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: () => BOMCostAPI.export(data),
    onSuccess: (res) => {
      downloadExcel(res)
      showMessage('export-success')
    }
  })
}
