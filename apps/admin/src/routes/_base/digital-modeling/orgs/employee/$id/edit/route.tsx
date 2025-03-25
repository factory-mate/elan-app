import { detailQO } from '@/features/digital-modeling/orgs/employee'

export const Route = createFileRoute('/_base/digital-modeling/orgs/employee/$id/edit')({
  staticData: {
    title: '编辑职员',
    permCode: 'employee:edit'
  },
  beforeLoad: async (ctx) => {
    await queryClient.ensureQueryData(detailQO(ctx.params.id))
  }
})
