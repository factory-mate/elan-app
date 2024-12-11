import { treeQO } from '@/features/digital-modeling/products/inventory-class'

export const Route = createFileRoute('/_base/digital-modeling/products/inventory-class/')({
  staticData: {
    title: '料品分类'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})