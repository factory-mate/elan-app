import { createFileRoute } from '@tanstack/react-router'

import { treeQO } from '@/features/vendor-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/vendor-class')({
  staticData: {
    title: '供应商分类',
    permCode: 'vendor-class'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
