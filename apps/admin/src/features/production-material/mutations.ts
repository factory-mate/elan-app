import { ProductionMaterialAPI } from './api'

export const useExportMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: PageDto) => ProductionMaterialAPI.export(data),
    onSuccess: (res) => {
      downloadExcel(res)
      showMessage('export-success')
    }
  })
}
