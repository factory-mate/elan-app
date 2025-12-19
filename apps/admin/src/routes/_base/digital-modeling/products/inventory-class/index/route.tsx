import { createFileRoute } from '@tanstack/react-router'

import { treeQO } from '@/features/inventory-class'

export const Route = createFileRoute('/_base/digital-modeling/products/inventory-class/')({
  staticData: {
    title: '料品分类',
    permCode: 'inventory-class'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
