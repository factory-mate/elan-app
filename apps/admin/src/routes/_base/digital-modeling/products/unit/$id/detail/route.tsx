import { createFileRoute } from '@tanstack/react-router'

import { loadRouteConfig } from '@/features/low-code'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/$id/detail')({
  staticData: {
    title: '单位档案详情',
    authKey: '300300308',
    modelCode: 'ManageCenter.Unit.M.View'
  },
  loader: async (ctx) => {
    const modelCode = ctx.route.options.staticData?.modelCode
    const config = await loadRouteConfig(modelCode)
    return { config }
  }
})
