import { AllMaterialAPI } from './api'

export const useExportMutation = () => {
  const { showMessage } = useMessage()
  return useMutation({
    mutationFn: (data: PageDto) => AllMaterialAPI.export(data),
    onSuccess: (res) => {
      downloadExcel(res)
      showMessage('export-success')
    }
  })
}
