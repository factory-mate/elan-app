import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/merchants/customer/')({
  staticData: {
    title: '客户档案',
    permCode: 'customer'
  }
})
