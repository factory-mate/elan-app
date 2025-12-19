import { createFileRoute } from '@tanstack/react-router'

import { fullListQO } from '@/features/mps-params'

export const Route = createFileRoute('/_base/plan-mgt/production-plan/mps-params/')({
  staticData: {
    title: 'MPS配置',
    permCode: 'mps-params'
  },
  beforeLoad: async () => {
    await Promise.all([queryClient.ensureQueryData(fullListQO())])
  }
})
