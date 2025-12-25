import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/merchants/vendor')({
  staticData: {
    title: '供应商档案',
    permCode: 'vendor'
  }
})
