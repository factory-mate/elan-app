import { fullListQO } from '@/features/dicts'
import { treeQO } from '@/features/digital-modeling/products/inventory-class'

export const Route = createFileRoute('/_base/digital-modeling/products/inventory/')({
  staticData: {
    title: '料品档案'
  },
  beforeLoad: async () => {
    await Promise.all([
      queryClient.ensureQueryData(treeQO()),
      queryClient.ensureQueryData(fullListQO('PeriodUnitType'))
    ])
  }
})
