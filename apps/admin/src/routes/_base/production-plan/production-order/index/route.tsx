import { fullListQO } from '@/features/dicts'

export const Route = createFileRoute('/_base/production-plan/production-order/')({
  staticData: {
    title: '生产订单'
  },
  beforeLoad: async () => {
    await Promise.all([
      queryClient.ensureQueryData(fullListQO('BOMType')),
      queryClient.ensureQueryData(fullListQO('ProductVouchStandardType'))
    ])
  }
})
