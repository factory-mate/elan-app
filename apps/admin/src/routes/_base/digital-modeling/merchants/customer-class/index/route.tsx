import { createFileRoute } from '@tanstack/react-router'

import { treeQO } from '@/features/customer-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/customer-class/')({
  staticData: {
    title: '客户分类',
    permCode: 'customer-class'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
