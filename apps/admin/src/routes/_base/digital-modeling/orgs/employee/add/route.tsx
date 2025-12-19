import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/orgs/employee/add')({
  staticData: {
    title: '新增职员',
    permCode: 'employee:add'
  }
})
