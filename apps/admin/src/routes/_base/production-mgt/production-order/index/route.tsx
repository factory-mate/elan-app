import { createFileRoute } from '@tanstack/react-router'

import { fullListQO } from '@/features/dicts'

export const Route = createFileRoute('/_base/production-mgt/production-order/')({
  staticData: {
    title: '生产订单',
    permCode: 'production-order'
  },
  beforeLoad: async () => {
    await Promise.all([
      queryClient.ensureQueryData(fullListQO('BOMType')),
      queryClient.ensureQueryData(fullListQO('ProductVouchStandardType'))
    ])
  }
})
