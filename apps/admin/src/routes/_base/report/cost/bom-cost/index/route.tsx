import { createFileRoute } from '@tanstack/react-router'

import { listQO } from '@/features/bom-cost'

export const Route = createFileRoute('/_base/report/cost/bom-cost/')({
  staticData: {
    title: 'BOM Cost 报表',
    permCode: 'bom-cost'
  },
  beforeLoad: async () => {
    await Promise.all([queryClient.ensureQueryData(listQO({}))])
  }
})
