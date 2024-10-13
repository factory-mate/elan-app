import { listQO } from '@/features/digital-modeling/products/unit'
import { loadRouteConfig } from '@/features/low-code'
import { defaultPageDto } from '@/features/pagination'

export const Route = createFileRoute('/_base/digital-modeling/products/unit-group/')({
  staticData: {
    title: '单位组档案',
    authKey: '300300301',
    modelCode: ''
  },
  loader: async (ctx) => {
    const modelCode = ctx.route.options.staticData?.modelCode
    queryClient.prefetchQuery(listQO(defaultPageDto))
    const config = await loadRouteConfig(modelCode)
    return { config }
  }
})
