import { treeQO } from '@/features/digital-modeling/merchants/vendor-class'

export const Route = createFileRoute('/_base/digital-modeling/merchants/vendor-class')({
  staticData: {
    title: '供应商分类',
    authKey: 'vendor-class'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
