import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/orgs/employee/')({
  staticData: {
    title: '职员档案',
    permCode: 'employee'
  }
})
