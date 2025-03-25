import { treeQO } from '@/features/digital-modeling/merchants/customer-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/customer-class/')({
  staticData: {
    title: '客户分类',
    permCode: 'customer-class'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
