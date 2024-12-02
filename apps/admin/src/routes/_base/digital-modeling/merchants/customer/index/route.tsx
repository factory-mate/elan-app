import { treeQO } from '@/features/digital-modeling/merchants/customer'

export const Route = createFileRoute('/_base/digital-modeling/merchants/customer/')({
  staticData: {
    title: '客户档案'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
