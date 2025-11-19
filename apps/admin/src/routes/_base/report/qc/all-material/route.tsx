import { defaultPageDto } from '@/features/pagination'
import { listQO } from '@/features/report/qc/all-material'

export const Route = createFileRoute('/_base/report/qc/all-material')({
  staticData: {
    title: '质控所有成分报表'
    // permCode: 'all-material'
  },
  beforeLoad: async () => {
    await Promise.all([queryClient.ensureQueryData(listQO(defaultPageDto))])
  }
})
