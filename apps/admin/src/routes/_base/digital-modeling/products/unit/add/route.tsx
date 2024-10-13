import { createFileRoute } from '@tanstack/react-router'

import { loadRouteConfig } from '@/features/low-code'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/add')({
  staticData: {
    title: '单位档案新增',
    authKey: '300300306',
    modelCode: 'ManageCenter.Unit.M.Add'
  },
  loader: async (ctx) => {
    const modelCode = ctx.route.options.staticData?.modelCode
    const config = await loadRouteConfig(modelCode)
    return { config }
  }
})
