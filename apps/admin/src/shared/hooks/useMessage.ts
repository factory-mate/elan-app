type MessageType =
  | 'success'
  | 'error'
  | 'select-data'
  | 'select-only-one'
  | 'export-success'
  | 'export-error'

export const useMessage = () => {
  const { message } = App.useApp()

  const showMessage = (type: MessageType) => {
    switch (type) {
      case 'success':
        message.success('操作成功')
        break
      case 'error':
        message.error('操作失败')
        break
      case 'select-data':
        message.warning('请选择数据')
        break
      case 'select-only-one':
        message.warning('只能选择一条数据')
        break
      case 'export-success':
        message.success('导出成功')
        break
      case 'export-error':
        message.error('导出失败')
        break

      default:
        break
    }
  }

  return { message, showMessage }
}
