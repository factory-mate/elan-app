import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import * as ProductionDateDiff from '@/features/production-date-diff'

export const Route = createLazyFileRoute('/_base/report/trace/production-date-diff/')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)

  const {
    data: { data = [], dataCount } = {},
    isFetching,
    isPlaceholderData
  } = useQuery(
    ProductionDateDiff.listQO({
      ...pageParams,
      orderByFileds: '',
      conditions: ''
    })
  )

  const columnDefs = useMemo<ColDef<ProductionDateDiff.ListVo>[]>(
    () => [
      { field: '批号', headerName: '批号' },
      { field: '产品编号', headerName: '产品编号' },
      { field: '产品名称', headerName: '产品名称' },
      { field: '生产日期', headerName: '生产日期' },
      { field: '质检生产日期', headerName: '质检生产日期' }
    ],
    []
  )

  return (
    <PageContainer>
      <Space
        orientation="vertical"
        className="w-full"
      >
        <div className="ag-theme-quartz h-[calc(100vh-211px)]">
          <AgGridReact<ProductionDateDiff.ListVo>
            ref={gridRef}
            getRowId={(params) => params.data.批号!}
            columnDefs={columnDefs}
            rowData={data}
            autoSizeStrategy={{
              type: 'fitGridWidth',
              defaultMinWidth: 200
            }}
            loading={isFetching}
          />
        </div>
        <Flex
          justify="end"
          align="center"
        >
          <Pagination
            disabled={isPlaceholderData}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共计 ${total} 条`}
            total={dataCount}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) =>
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }
          />
        </Flex>
      </Space>
    </PageContainer>
  )
}
