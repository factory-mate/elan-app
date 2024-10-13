import { createFileRoute } from '@tanstack/react-router'

import { loadRouteConfig } from '@/features/low-code'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/$id/edit')({
  staticData: {
    title: '单位档案编辑',
    authKey: '300300307',
    modelCode: 'ManageCenter.Unit.M.Edit'
  },
  loader: async (ctx) => {
    const modelCode = ctx.route.options.staticData?.modelCode
    const config = await loadRouteConfig(modelCode)
    return { config }
  }
})
