import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import {
  listQO,
  type PurPlanVo,
  useCheckMutation,
  useExecuteMutation,
  useLockMutation,
  useSyncMutation
} from '@/features/pur-plan'

import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/plan-mgt/pur-plan/')({
  component: RouteComponent
})

function RouteComponent() {
  // const [form] = Form.useForm()
  const { showMessage } = useMessage()

  const gridRef = useRef<AgGridReact>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  // const [filterData, setFilterData] = useState<FilterForm>({})

  const {
    data: { data = [], dataCount } = {},
    isFetching,
    isPlaceholderData
  } = useQuery(
    listQO({
      ...pageParams,
      orderByFileds: '',
      conditions: queryBuilder<FilterForm>([
        // { key: 'dBeginTime', type: 'date-range', val: filterData.dBeginTime },
        // { key: 'cCode', type: 'like', val: filterData.cCode },
        // { key: 'cInvCode', type: 'like', val: filterData.cInvCode }
      ])
    })
  )
  const executeMutation = useExecuteMutation()
  const syncMutation = useSyncMutation()
  const checkMutation = useCheckMutation()
  const lockMutation = useLockMutation()

  // const filterDefs = useMemo<FilterDef<FilterForm>[]>(
  //   () => [
  //     { name: 'dBeginTime', label: '开工日期', type: 'date-range-picker' },
  //     { name: 'cCode', label: '生产订单号', type: 'input' },
  //     { name: 'cInvCode', label: '料品编码', type: 'input' }
  //   ],
  //   []
  // )

  const columnDefs = useMemo<ColDef<PurPlanVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '物料编码' },
      { field: 'cInvName', headerName: '物料名称' },
      { field: 'cInvStd', headerName: '规格型号' },
      { field: 'nSaleQuantity', headerName: '销售订单需求量' },
      { field: 'nProductQuantity', headerName: '生产订单需求量' },
      { field: 'nAllQuantity', headerName: '总需求量' },
      { field: 'nStockQuantity', headerName: '库存可用量' },
      { field: 'nPurQuantity', headerName: '采购订单量' },
      { field: 'nLockQuantity', headerName: '锁定且未下订单的计划量' },
      { field: 'nQuantity', headerName: '净需求量' },
      { field: 'dNeedDate', headerName: '需求日期' },
      { field: 'dMadeDate', headerName: '运算日期' },
      { field: 'iLockStatusName', headerName: '锁定状态' },
      { field: 'iSyncStatusName', headerName: '同步状态' }
    ],
    []
  )

  return (
    <PageContainer>
      {/* <FilterArea
        form={{ form }}
        filterDefs={filterDefs}
        filterData={filterData}
        setFilterData={setFilterData}
        queryKey={LIST_QK}
      /> */}
      <Flex
        className="h-8"
        justify="space-between"
        align="center"
      >
        <Space>
          <PermCodeProvider code="pur-plan:sync">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                syncMutation.mutate(selectedRows.map((i) => i.UID))
              }}
              loading={syncMutation.isPending}
              disabled={syncMutation.isPending}
            >
              同步
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="pur-plan:lock">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                lockMutation.mutate(selectedRows.map((i) => i.UID))
              }}
              loading={lockMutation.isPending}
              disabled={lockMutation.isPending}
            >
              锁定
            </Button>
          </PermCodeProvider>
        </Space>
        <Space>
          <PermCodeProvider code="pur-plan:check">
            <Button
              onClick={() => checkMutation.mutate()}
              loading={checkMutation.isPending}
              disabled={checkMutation.isPending}
            >
              缺 BOM 物料
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="pur-plan:execute">
            <Button
              onClick={() => executeMutation.mutate()}
              loading={executeMutation.isPending}
              disabled={executeMutation.isPending}
            >
              运算
            </Button>
          </PermCodeProvider>
        </Space>
      </Flex>
      <div className="ag-theme-quartz flex-1">
        <AgGridReact<PurPlanVo>
          ref={gridRef}
          getRowId={(params) => params.data.UID}
          columnDefs={columnDefs}
          rowData={data}
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
            type: 'fitCellContents'
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
          total={dataCount}
          pageSize={pageParams.pageSize}
          pageSizeOptions={defaultPageSizeOptions}
          onChange={(pageIndex, pageSize) => {
            setSelectedRows(gridRef.current!.api.getSelectedRows())
            setPageParams({ ...pageParams, pageIndex, pageSize })
          }}
        />
      </Flex>
    </PageContainer>
  )
}
