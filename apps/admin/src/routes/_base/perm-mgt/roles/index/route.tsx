import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/perm-mgt/roles/')({
  staticData: {
    title: '角色管理',
    permCode: 'roles'
  }
})
