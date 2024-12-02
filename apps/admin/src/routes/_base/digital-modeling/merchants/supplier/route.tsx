import { treeQO } from '@/features/digital-modeling/merchants/supplier'

export const Route = createFileRoute('/_base/digital-modeling/merchants/supplier')({
  staticData: {
    title: '供应商档案'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
