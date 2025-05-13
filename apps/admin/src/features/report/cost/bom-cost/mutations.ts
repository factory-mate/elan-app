import { BOMCostAPI } from './api'
import type { BOMCostDto } from './types'

export const useExportMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: BOMCostDto) => BOMCostAPI.export(data),
    onSuccess: (res) => {
      downloadExcel(res)
      showMessage('export-success')
    }
  })
}
