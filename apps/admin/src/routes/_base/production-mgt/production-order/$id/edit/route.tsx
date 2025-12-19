import { createFileRoute } from '@tanstack/react-router'

import { detailBodysQO, detailQO } from '@/features/production-order'

export const Route = createFileRoute('/_base/production-mgt/production-order/$id/edit')({
  staticData: {
    title: '编辑生产订单',
    permCode: 'production-order:edit'
  },
  beforeLoad: async (ctx) => {
    await Promise.all([
      queryClient.ensureQueryData(detailQO(ctx.params.id)),
      queryClient.ensureQueryData(detailBodysQO(ctx.params.id))
    ])
  }
})
