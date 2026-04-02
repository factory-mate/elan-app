import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/workshop-mgt/workshop-config/weight/')({
  staticData: {
    title: '电子秤误差配置',
    permCode: 'weight'
  }
})
