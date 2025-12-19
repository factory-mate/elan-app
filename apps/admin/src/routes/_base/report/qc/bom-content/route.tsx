import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/report/qc/bom-content')({
  staticData: {
    title: '配方含量查询',
    permCode: 'bom-content'
  }
})
