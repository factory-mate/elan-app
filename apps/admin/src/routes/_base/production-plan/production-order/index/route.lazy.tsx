import type { ColDef } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'

import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import {
  listQO,
  type ProductionOrderVo,
  useAbandonMutation,
  useAuditMutation,
  useCloseMutation,
  useDeleteMutation,
  useOpenMutation
} from '@/features/production-plan/production-order'

export const Route = createLazyFileRoute('/_base/production-plan/production-order/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])

  const createModal = useModal()

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({ ...pageParams, conditions: undefined })
  )

  const auditMutation = useAuditMutation()
  const abandonMutation = useAbandonMutation()
  const openMutation = useOpenMutation()
  const closeMutation = useCloseMutation()
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<ProductionOrderVo>[]>(
    () => [
      { field: 'cCode', headerName: '生产订单号' },
      { field: 'cSourceRowUID', headerName: '行号' },
      { field: 'cVouchTypeName', headerName: '类型' },
      { field: 'cInvName', headerName: '车间' },
      { field: 'iStatus', headerName: '状态' },
      { field: 'cCreateUserName', headerName: '制单人' },
      { field: 'cModifyUserName', headerName: '审核人' },
      { field: 'cModifyUserName', headerName: '关闭人' },
      { field: 'dBeginTime', headerName: '订单时间' },
      { field: 'cInvCode', headerName: '料品编码' },
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cInvStd', headerName: '规格型号' },
      { field: 'nQuantity', headerName: '生产数量' },
      { field: 'cUnitName', headerName: '计量单位' },
      { field: 'dBeginTime', headerName: '开工时间' },
      { field: 'dEndTime', headerName: '完工时间' },
      { field: 'cAssQuantity', headerName: '已完工数量' },
      { field: 'RestQuantity', headerName: '未完工数量' },
      { field: 'cBomType', headerName: 'BOM类型' },
      { field: 'cBomVersion', headerName: 'BOM版本' },
      { field: 'cBomVersion', headerName: 'BOM版本说明' },
      { field: 'dVerifyTime', headerName: '审核时间' },
      { field: 'dEndTime', headerName: '关闭时间' }
    ],
    []
  )

  return (
    <PageContainer>
      <Space
        direction="vertical"
        className="w-full"
      >
        <Flex
          className="h-8"
          justify="space-between"
          align="center"
        >
          <Space>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                auditMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              审核
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                abandonMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              弃审
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                closeMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              关闭
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                openMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              打开
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                deleteMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              删除
            </Button>
          </Space>
          <Space>
            <Button
              type="primary"
              onClick={() => createModal.toggle()}
            >
              新增
            </Button>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-210px)]">
          <AgGridReact<ProductionOrderVo>
            ref={gridRef}
            getRowId={(params) => params.data.UID}
            columnDefs={columnDefs}
            rowData={data?.data}
            rowSelection={{
              mode: 'multiRow'
            }}
            selectionColumnDef={{
              sortable: true,
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