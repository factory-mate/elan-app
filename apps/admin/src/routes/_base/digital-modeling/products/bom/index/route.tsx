import { treeQO } from '@/features/bom'
import { fullListQO } from '@/features/dicts'

export const Route = createFileRoute('/_base/digital-modeling/products/bom/')({
  staticData: {
    title: '物料清单/配方',
    permCode: 'bom'
  },
  beforeLoad: async () => {
    await Promise.all([
      queryClient.ensureQueryData(treeQO()),
      queryClient.ensureQueryData(fullListQO('BOMType'))
    ])
  }
})
