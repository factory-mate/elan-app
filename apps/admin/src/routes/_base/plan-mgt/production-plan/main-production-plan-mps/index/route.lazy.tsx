import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import {
  listQO,
  type MainProductionPlanMpsVo,
  useCancelMutation,
  useDeleteMutation,
  usePushMutation
} from '@/features/main-production-plan-mps'

import { EditModal, MpsModal } from './-components'
import FilterArea from './-components/FilterArea'
import type { EditModalMeta, FilterForm } from './-types'

export const Route = createLazyFileRoute(
  '/_base/plan-mgt/production-plan/main-production-plan-mps/'
)({
  component: RouteComponent
})

function RouteComponent() {
  const { message, showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})

  const editModal = useModal<EditModalMeta>()
  const mpsModal = useModal()

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cInvCode', type: 'gte', val: filterData.cInvCodeStart },
        { key: 'cInvCode', type: 'lte', val: filterData.cInvCodeEnd },
        { key: 'cDepCode', type: 'eq', val: filterData.cDepCode },
        {
          key: 'dStartDate',
          type: 'gte',
          val: filterData.dStartDate
            ? DateUtils.formatTime(filterData.dStartDate, 'YYYY-MM-DD')
            : undefined
        },
        {
          key: 'dEndDate',
          type: 'lte',
          val: filterData.dEndDate
            ? DateUtils.formatTime(filterData.dEndDate, 'YYYY-MM-DD')
            : undefined
        }
      ])
    })
  )
  const deleteMutation = useDeleteMutation()
  const pushMutation = usePushMutation()
  const cancelMutation = useCancelMutation()

  const columnDefs = useMemo<ColDef<MainProductionPlanMpsVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '产品编码', width: 200 },
      { field: 'cInvName', headerName: '产品名称', width: 300, tooltipField: 'cInvName' },
      { field: 'cInvStd', headerName: '规格型号', width: 150 },
      { field: 'cDepName', headerName: '生产部门', width: 150 },
      { field: 'nQuantity', headerName: '计划数量', width: 120 },
      { field: 'nStockQuantity', headerName: '库存', width: 100 },
      { field: 'dStartDate', headerName: '开始日期', width: 200 },
      { field: 'dEndDate', headerName: '结束日期', width: 200 },
      { field: 'iStatusName', headerName: '状态', width: 150 },
      { field: 'cModifyUserName', headerName: '修改人', width: 150 },
      {
        headerName: '操作',
        width: 250,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<MainProductionPlanMpsVo>) => (
          <Space>
            <PermCodeProvider code="main-production-plan-mps:edit">
              <VisibleProvider visible={params.data!.iStatus === 0}>
                <Button
                  size="small"
                  color="primary"
                  variant="text"
                  onClick={() => {
                    editModal.setMeta({ UID: params.data!.UID })
                    editModal.toggle()
                  }}
                >
                  编辑
                </Button>
              </VisibleProvider>
            </PermCodeProvider>
            <PermCodeProvider code="main-production-plan-mps:delete">
              <VisibleProvider visible={params.data!.iStatus === 0}>
                <Popconfirm
                  title="确认执行该操作？"
                  okButtonProps={{
                    disabled: deleteMutation.isPending,
                    loading: deleteMutation.isPending
                  }}
                  onConfirm={() => deleteMutation.mutate([params.data!.UID])}
                >
                  <Button
                    size="small"
                    color="primary"
                    variant="text"
                    disabled={deleteMutation.isPending}
                  >
                    删除
                  </Button>
                </Popconfirm>
              </VisibleProvider>
            </PermCodeProvider>
          </Space>
        )
      }
    ],
    [deleteMutation, editModal]
  )

  return (
    <PageContainer>
      <Space
        orientation="vertical"
        className="w-full"
      >
        <FilterArea setFilterData={setFilterData} />
        <Flex
          className="h-8"
          justify="space-between"
          align="center"
        >
          <Space>
            <PermCodeProvider code="main-production-plan-mps:push">
              <Button
                onClick={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  pushMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                生单
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="main-production-plan-mps:cancel-push">
              <Button
                onClick={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  cancelMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                撤单
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="main-production-plan-mps:delete">
              <Popconfirm
                title="确认执行该操作？"
                okButtonProps={{
                  disabled: deleteMutation.isPending,
                  loading: deleteMutation.isPending
                }}
                onConfirm={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  if (selectedRows.some((i) => i.iStatus === 0)) {
                    message.warning('勾选了已生单数据，不允许删除')
                    return
                  }
                  deleteMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                <Button disabled={deleteMutation.isPending}>删除</Button>
              </Popconfirm>
            </PermCodeProvider>
          </Space>
          <Space>
            <PermCodeProvider code="main-production-plan-mps:compute">
              <Button onClick={() => mpsModal.toggle()}>MPS运算</Button>
            </PermCodeProvider>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
          <AgGridReact<MainProductionPlanMpsVo>
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
            autoSizeStrategy={{
              type: 'fitGridWidth'
            }}
            loading={isFetching}
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
            showTotal={(total) =>
              selectedRows.length > 0
                ? `已选中 ${selectedRows.length} 条，共计 ${total} 条`
                : `共计 ${total} 条`
            }
            total={data?.dataCount}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) => {
              setSelectedRows(gridRef.current!.api.getSelectedRows())
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }}
          />
        </Flex>
      </Space>

      <EditModal
        meta={editModal.meta}
        open={editModal.open}
        setOpen={editModal.setOpen}
      />
      <MpsModal
        open={mpsModal.open}
        setOpen={mpsModal.setOpen}
      />
    </PageContainer>
  )
}
