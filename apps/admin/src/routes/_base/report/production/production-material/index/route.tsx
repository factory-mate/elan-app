import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/report/production/production-material/')({
  staticData: {
    title: '生产用料明细表',
    permCode: 'production-material'
  }
})
