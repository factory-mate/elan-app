import { detailBodysQO, detailQO } from '@/features/production-plan/production-order'

export const Route = createFileRoute('/_base/production-plan/production-order/$id/edit')({
  staticData: {
    title: '编辑生产订单'
  },
  beforeLoad: async (ctx) => {
    await Promise.all([
      queryClient.ensureQueryData(detailQO(ctx.params.id)),
      queryClient.ensureQueryData(detailBodysQO(ctx.params.id))
    ])
  }
})
