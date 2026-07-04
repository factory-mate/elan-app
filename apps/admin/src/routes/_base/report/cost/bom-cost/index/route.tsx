import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/report/cost/bom-cost/')({
  staticData: {
    title: 'BOM Cost 报表',
    permCode: 'bom-cost'
  }
})
