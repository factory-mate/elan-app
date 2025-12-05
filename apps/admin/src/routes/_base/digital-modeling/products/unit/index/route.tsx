import { listQO } from '@/features/unit'
import { fullListQO } from '@/features/unit-class'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/')({
  staticData: {
    title: '计量单位档案',
    permCode: 'unit'
  },
  beforeLoad: async () => {
    await Promise.allSettled([
      queryClient.ensureQueryData(listQO(defaultPageDto)),
      queryClient.ensureQueryData(fullListQO({}))
    ])
  }
})
