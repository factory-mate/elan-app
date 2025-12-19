import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/supply-chain-mgt/sales-mgt/sales-order/')({
  staticData: {
    title: '销售订单',
    permCode: 'sales-order'
  }
})
