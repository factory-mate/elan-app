import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/production-mgt/production-order/add')({
  staticData: {
    title: '创建生产订单',
    permCode: 'production-order:add'
  }
})
