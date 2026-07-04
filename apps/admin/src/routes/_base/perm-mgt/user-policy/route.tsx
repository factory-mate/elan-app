import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/perm-mgt/user-policy')({
  staticData: {
    title: '用户策略管理',
    permCode: 'user-policy'
  }
})
