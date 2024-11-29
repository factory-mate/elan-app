export const useMessage = () => {
  const { message } = App.useApp()

  const showMessage = (type: 'success' | 'error') => {
    switch (type) {
      case 'success':
        message.success('操作成功')
        break
      case 'error':
        message.error('操作失败')
        break
      default:
        break
    }
  }

  return { message, showMessage }
}
