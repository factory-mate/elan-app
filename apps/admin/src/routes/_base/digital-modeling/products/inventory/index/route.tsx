import { createFileRoute } from '@tanstack/react-router'

import { fullListQO } from '@/features/dicts'
import { treeQO } from '@/features/inventory-class'

export const Route = createFileRoute('/_base/digital-modeling/products/inventory/')({
  staticData: {
    title: '料品档案',
    permCode: 'inventory'
  },
  beforeLoad: async () => {
    await Promise.all([
      queryClient.ensureQueryData(treeQO()),
      queryClient.ensureQueryData(fullListQO('PeriodUnitType'))
    ])
  }
})
