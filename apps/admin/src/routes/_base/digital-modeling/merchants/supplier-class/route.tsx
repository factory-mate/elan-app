import { treeQO } from '@/features/digital-modeling/merchants/supplier-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/supplier-class')({
  staticData: {
    title: '供应商分类'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
