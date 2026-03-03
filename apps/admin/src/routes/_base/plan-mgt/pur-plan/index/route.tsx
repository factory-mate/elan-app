import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/plan-mgt/pur-plan/')({
  staticData: {
    title: '采购计划',
    permCode: 'pur-plan'
  }
})
