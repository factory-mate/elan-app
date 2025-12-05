import { BOMContentAPI } from './api'
import type { BOMContentDto } from './types'

export const useExportMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: BOMContentDto) => BOMContentAPI.export(data),
    onSuccess: (res) => {
      downloadExcel(res)
      showMessage('export-success')
    }
  })
}
