import { treeQO } from '@/features/digital-modeling/merchants/vendor-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/vendor')({
  staticData: {
    title: '供应商档案',
    permCode: 'vendor'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
