import type { ColDef } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'

import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import { listQO, type SalesOrderVo } from '@/features/production-plan/sales-order'

export const Route = createLazyFileRoute('/_base/production-plan/sales-order/')({
  component: RouteComponent
})

function RouteComponent() {
  const [pageParams, setPageParams] = useState(defaultPageDto)

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({ ...pageParams, conditions: undefined })
  )

  const columnDefs = useMemo<ColDef<SalesOrderVo>[]>(
    () => [
      { field: 'cCode', headerName: '销售订单号' },
      { field: 'dDate', headerName: '单据日期' },
      { field: 'cCusCode', headerName: '客户编码' },
      { field: 'cCusName', headerName: '客户名称' },
      { field: 'cMemo', headerName: '备注' },
      { field: 'dCreateTime', headerName: '创建时间' },
      { field: 'cCreateUserName', headerName: '创建人名称' }
    ],
    []
  )

  return (
    <PageContainer>
      <Space
        direction="vertical"
        className="w-full"
      >
        <div className="ag-theme-quartz h-[calc(100vh-210px)]">
          <AgGridReact<SalesOrderVo>
            getRowId={(params) => params.data.UID}
            columnDefs={columnDefs}
            rowData={data?.data}
            headerHeight={36}
            rowHeight={36}
            tooltipShowDelay={1000}
            tooltipHideDelay={0}
            loading={isFetching}
            noRowsOverlayComponent={() => '暂无数据'}
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
            total={data?.dataCount}
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
