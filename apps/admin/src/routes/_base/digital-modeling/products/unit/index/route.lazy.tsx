import type { ColDef, ICellRendererParams } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'

import {
  listQO,
  useDeleteMutation,
  useStartMutation,
  useStopMutation
} from '@/features/digital-modeling/products/unit'
import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import { buildIndexColDef } from '@/shared/ag-grid'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit/')({
  component: Page
})

function Page() {
  const { cols } = Route.useLoaderData().config.table
  const { message } = App.useApp()

  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])

  const { data, isFetching, isPlaceholderData } = useQuery(listQO(pageParams))

  const startMutation = useStartMutation()
  const stopMutation = useStopMutation()
  const deleteMutation = useDeleteMutation()

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
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams) => (
          <Space>
            <Link
              to="/digital-modeling/products/unit/$id/edit"
              params={{ id: params.data.UID }}
            >
              <Button size="small">编辑</Button>
            </Link>
            <Link
              to="/digital-modeling/products/unit/$id/detail"
              params={{ id: params.data.UID }}
            >
              <Button size="small">详情</Button>
            </Link>
            <Button
              size="small"
              disabled={stopMutation.isPending}
              onClick={() => stopMutation.mutate([params.data.UID])}
            >
              停用
            </Button>
          </Space>
        )
      }
    ],
    [cols, stopMutation]
  )

  return (
    <PageContainer>
      <Space direction="vertical">
        <BasicFilter />

        <Flex
          className="h-8"
          justify="space-between"
          align="center"
        >
          <Space>
            <Button
              disabled={startMutation.isPending}
              onClick={() => {
                const ids = selectedRows.map((i) => i.UID)
                if (ids.length === 0) {
                  message.warning('请至少选择一条数据')
                  return
                }
                stopMutation.mutate(ids)
              }}
            >
              启用
            </Button>
            <Button
              danger
              disabled={deleteMutation.isPending}
              onClick={() => {
                const ids = selectedRows.map((i) => i.UID)
                if (ids.length === 0) {
                  message.warning('请至少选择一条数据')
                  return
                }
                deleteMutation.mutate(ids)
              }}
            >
              删除
            </Button>
          </Space>
          <Space>
            <Link to="/digital-modeling/products/unit/add">
              <Button type="primary">新增</Button>
            </Link>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-354px)]">
          <AgGridReact
            ref={gridRef}
            getRowId={(params) => params.data.UID}
            columnDefs={columnDefs}
            rowData={data?.data}
            rowSelection={{
              mode: 'multiRow',
              enableClickSelection: true,
              enableSelectionWithoutKeys: true
            }}
            selectionColumnDef={{
              sortable: true,
              maxWidth: 70,
              suppressHeaderMenuButton: true,
              pinned: 'left',
              lockPinned: true
            }}
            headerHeight={36}
            rowHeight={36}
            tooltipShowDelay={1000}
            tooltipHideDelay={0}
            loading={isFetching}
            noRowsOverlayComponent={() => '暂无数据'}
            onSelectionChanged={(event) => setSelectedRows(event.api.getSelectedRows())}
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
            showTotal={(total) => {
              const text = `共计 ${total} 条`
              if (selectedRows.length > 0) {
                return `已选中 ${selectedRows.length} 条，${text}`
              }
              return text
            }}
            total={data?.pageCount}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) => {
              setSelectedRows(gridRef.current!.api.getSelectedRows())
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }}
          />
        </Flex>
      </Space>
    </PageContainer>
  )
}
