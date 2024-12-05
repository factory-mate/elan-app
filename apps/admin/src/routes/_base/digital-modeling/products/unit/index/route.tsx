import { listQO } from '@/features/digital-modeling/products/unit'
import { fullListQO } from '@/features/digital-modeling/products/unit-class'
import { defaultPageDto } from '@/features/pagination'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/')({
  staticData: {
    title: '计量单位档案'
  },
  beforeLoad: async () => {
    await Promise.allSettled([
      queryClient.ensureQueryData(listQO(defaultPageDto)),
      queryClient.ensureQueryData(fullListQO())
    ])
  }
})
