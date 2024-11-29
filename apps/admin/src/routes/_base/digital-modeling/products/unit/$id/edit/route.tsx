import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/$id/edit')({
  staticData: {
    title: '单位档案编辑'
  }
})
