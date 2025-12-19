import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/print')({
  staticData: {
    title: '打印测试'
  }
})
