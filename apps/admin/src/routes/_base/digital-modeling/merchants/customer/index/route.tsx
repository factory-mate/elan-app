import { treeQO } from '@/features/customer-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/customer/')({
  staticData: {
    title: '客户档案',
    permCode: 'customer'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
