import { fullListQO } from '@/features/dicts'

export const Route = createFileRoute('/_base/production-mgt/production-order/add')({
  staticData: {
    title: '创建生产订单',
    permCode: 'production-order:add'
  },
  beforeLoad: async () => {
    await Promise.all([
      queryClient.ensureQueryData(fullListQO('BOMType')),
      queryClient.ensureQueryData(fullListQO('ProductVouchStandardType'))
    ])
  }
})
