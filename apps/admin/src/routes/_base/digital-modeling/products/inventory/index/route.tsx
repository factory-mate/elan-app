import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/products/inventory/')({
  staticData: {
    title: '料品档案',
    permCode: 'inventory'
  }
})
