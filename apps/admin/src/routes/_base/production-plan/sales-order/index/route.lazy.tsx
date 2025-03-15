import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import {
  listQO,
  type SalesOrderVo,
  useDeleteMutation,
  useSyncMutation
} from '@/features/production-plan/sales-order'

export const Route = createLazyFileRoute('/_base/production-plan/sales-order/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({ ...pageParams, conditions: undefined })
  )

  const deleteMutation = useDeleteMutation()
  const syncMutation = useSyncMutation()

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
              onClick={() => syncMutation.mutate()}
            >
              同步
            </Button>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
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
