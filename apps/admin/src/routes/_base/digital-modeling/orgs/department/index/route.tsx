import { createFileRoute } from '@tanstack/react-router'

import { treeQO } from '@/features/department'

export const Route = createFileRoute('/_base/digital-modeling/orgs/department/')({
  staticData: {
    title: '部门档案',
    permCode: 'department'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(treeQO())
  }
})
