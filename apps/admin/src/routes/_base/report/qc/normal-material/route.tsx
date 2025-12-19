import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/report/qc/normal-material')({
  staticData: {
    title: '质控常规报告',
    permCode: 'normal-material'
  }
})
