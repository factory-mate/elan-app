import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/production-mgt/production-order/')({
  staticData: {
    title: '生产订单',
    permCode: 'production-order'
  }
})
