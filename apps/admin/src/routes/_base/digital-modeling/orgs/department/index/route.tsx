import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/orgs/department/')({
  staticData: {
    title: '部门档案',
    permCode: 'department'
  }
})
