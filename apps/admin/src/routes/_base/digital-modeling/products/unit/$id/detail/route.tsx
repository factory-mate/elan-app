import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/$id/detail')({
  staticData: {
    title: '单位档案详情'
  }
})
