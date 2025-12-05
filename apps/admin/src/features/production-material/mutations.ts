import { ProductionMaterialAPI } from './api'

export const useExportMutation = (data: PageDto) => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: () => ProductionMaterialAPI.export(data),
    onSuccess: (res) => {
      downloadExcel(res)
      showMessage('export-success')
    }
  })
}
