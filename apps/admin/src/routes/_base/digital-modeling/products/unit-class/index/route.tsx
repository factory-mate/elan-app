import { listQO } from '@/features/digital-modeling/products/unit'
import { defaultPageDto } from '@/features/pagination'

export const Route = createFileRoute('/_base/digital-modeling/products/unit-class/')({
  staticData: {
    title: '计量单位组档案'
  },
  loader: async () => {
    await queryClient.prefetchQuery(listQO(defaultPageDto))
  }
})
