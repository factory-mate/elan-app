import { listQO } from '@/features/report/cost/bom-cost/queries'

export const Route = createFileRoute('/_base/report/cost/bom-cost/')({
  staticData: {
    title: 'BOM Cost',
    permCode: 'bom-cost'
  },
  beforeLoad: async () => {
    await Promise.all([queryClient.ensureQueryData(listQO({}))])
  }
})
