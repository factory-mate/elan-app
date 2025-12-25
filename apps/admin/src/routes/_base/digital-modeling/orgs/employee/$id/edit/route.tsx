import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/orgs/employee/$id/edit')({
  staticData: {
    title: '编辑职员',
    permCode: 'employee:edit'
  }
})
