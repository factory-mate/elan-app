import { listQO } from '@/features/digital-modeling/products/bom-cost/queries'

export const Route = createFileRoute('/_base/digital-modeling/products/bom-cost/')({
  staticData: {
    title: 'BOM Cost 报表',
    permCode: 'bom-cost'
  },
  beforeLoad: async () => {
    await Promise.all([queryClient.ensureQueryData(listQO({}))])
  }
})
