import { treeQO } from '@/features/digital-modeling/products/bom'

export const Route = createFileRoute('/_base/digital-modeling/products/bom/')({
  staticData: {
    title: '物料清单/配方'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
