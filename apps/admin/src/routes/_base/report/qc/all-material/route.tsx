import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/report/qc/all-material')({
  staticData: {
    title: '质控所有成分报表',
    permCode: 'all-material'
  }
})
