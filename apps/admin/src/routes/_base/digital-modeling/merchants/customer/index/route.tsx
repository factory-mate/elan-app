import { treeQO } from '@/features/digital-modeling/merchants/customer-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/customer/')({
  staticData: {
    title: '客户档案',
    authKey: 'customer'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
