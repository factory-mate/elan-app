import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_base/digital-modeling/products/bom-change')({
  staticData: {
    title: '物料清单整批修改',
    permCode: 'bom-change'
  }
})
