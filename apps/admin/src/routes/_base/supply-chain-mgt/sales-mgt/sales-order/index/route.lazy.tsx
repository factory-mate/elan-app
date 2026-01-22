import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import {
  LIST_QK,
  listQO,
  type SalesOrderVo,
  useDeleteMutation,
  useSyncMutation
} from '@/features/sales-order'

import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/supply-chain-mgt/sales-mgt/sales-order/')({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm()
  const { showMessage } = useMessage()

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cCode', type: 'like', val: filterData.cCode },
        { key: 'dDate', type: 'date-range', val: filterData.dDate },
        { key: 'cCusCode', type: 'like', val: filterData.cCusCode },
        { key: 'cCusName', type: 'like', val: filterData.cCusName }
      ])
    })
  )

  const deleteMutation = useDeleteMutation()
  const syncMutation = useSyncMutation()

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      { name: 'cCode', label: '销售订单号', type: 'input' },
      { name: 'dDate', label: '单据日期', type: 'date-range-picker' },
      { name: 'cCusCode', label: '客户编码', type: 'input' },
      { name: 'cCusName', label: '客户名称', type: 'input' }
    ],
    []
  )

  const columnDefs = useMemo<ColDef<SalesOrderVo>[]>(
    () => [
      { field: 'cCode', headerName: '销售订单号' },
      { field: 'dDate', headerName: '单据日期' },
      { field: 'cCusCode', headerName: '客户编码' },
      { field: 'cCusName', headerName: '客户名称' },
      { field: 'cMemo', headerName: '备注' },
      { field: 'dCreateTime', headerName: '创建时间' },
      { field: 'cCreateUserName', headerName: '创建人名称' },
      { field: 'cInvCode', headerName: '料品编码' },
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cInvStd', headerName: '规格型号' },
      { field: 'cUnitName', headerName: '计量单位' },
      { field: 'nQuantity', headerName: '订单数量' },
      { field: 'cDefindParm02', headerName: '订单金额' },
      { field: 'nQuantity', headerName: '累计生产入库数量' },
      { field: 'dDate', headerName: '预计发货日期' },
      { field: 'cDepName', headerName: '销售部门' },
      { field: 'cSTName', headerName: '销售类型' }
    ],
    []
  )

  return (
    <PageContainer>
      <Space
        orientation="vertical"
        className="w-full"
      >
        <FilterArea
          form={{
            form,
            onFinish: (values) => setFilterData?.({ ...values })
          }}
          filterDefs={filterDefs}
          onReset={() => setFilterData?.({})}
          queryKey={LIST_QK}
        />
        <Flex
          className="h-8"
          justify="space-between"
          align="center"
        >
          <Space>
            <PermCodeProvider code="sales-order:delete">
              <Button
                onClick={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                  }
                  deleteMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                删除
              </Button>
            </PermCodeProvider>
          </Space>
          <Space>
            <PermCodeProvider code="sales-order:sync">
              <Button
                type="primary"
                onClick={() => syncMutation.mutate()}
              >
                同步
              </Button>
            </PermCodeProvider>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-351px)]">
          <AgGridReact<SalesOrderVo>
            getRowId={(params) => params.data.UID!}
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
