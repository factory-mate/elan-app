import type { ColDef } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'

import { lowCodePageQueryQO, useTableConfig } from '@/features/low-code'
import { defaultPageParams, defaultPageSizeOptions } from '@/features/pagination'
import { buildIndexColDef } from '@/shared/ag-grid'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit')({
  component: Page
})

function Page() {
  const { cols, actionButtons, api } = useTableConfig()

  const [pageParams, setPageParams] = useState(defaultPageParams)

  const { data, isFetching, isPlaceholderData } = useQuery(
    lowCodePageQueryQO({ method: api?.httpType, url: api?.url }, pageParams)
  )

  const columnDefs = useMemo<ColDef[]>(
    () => [
      buildIndexColDef(),
      ...cols.map<ColDef>((i) => ({
        field: i.code,
        headerName: i.label,
        tooltipField: i.code,
        headerTooltip: i.label
      })),
      {
        headerName: '操作',
        width: 200,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: () => (
          <Space>
            {actionButtons.map((actionButton) => (
              <Button
                key={actionButton.code}
                size="small"
                onClick={() => {}}
              >
                {actionButton.label}
              </Button>
            ))}
          </Space>
        )
      }
    ],
    [cols, actionButtons]
  )

  return (
    <PageContainer>
      <div className="h-[calc(100vh-248px)] space-y-1.5">
        <AgGridReact
          className="ag-theme-quartz"
          getRowId={(params) => params.data.UID}
          columnDefs={columnDefs}
          rowData={data?.data}
          rowSelection={{
            mode: 'multiRow',
            enableClickSelection: true
          }}
          selectionColumnDef={{
            sortable: true,
            maxWidth: 70,
            suppressHeaderMenuButton: true,
            pinned: 'left',
            lockPinned: true
          }}
          tooltipShowDelay={1000}
          tooltipHideDelay={0}
          loading={isFetching}
          noRowsOverlayComponent={() => '暂无数据'}
        />
        <div className="flex items-center justify-end">
          <Pagination
            disabled={isPlaceholderData}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共计 ${total} 条`}
            total={data?.pageCount}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) =>
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }
          />
        </div>
      </div>
    </PageContainer>
  )
}
