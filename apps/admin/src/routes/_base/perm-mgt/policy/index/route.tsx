import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/perm-mgt/policy/')({
  staticData: {
    title: '策略档案',
    permCode: 'policy'
  }
})
