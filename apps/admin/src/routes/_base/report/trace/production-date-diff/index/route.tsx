import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/report/trace/production-date-diff/')({
  staticData: {
    title: '生产日期差异表',
    permCode: 'production-date-diff'
  }
})
