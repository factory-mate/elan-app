type MessageType = 'success' | 'error' | 'select-data'

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
      default:
        break
    }
  }

  return { message, showMessage }
}
