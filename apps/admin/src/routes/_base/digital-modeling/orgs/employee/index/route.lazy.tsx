import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { Key } from 'react'

import {
  useDeleteMutation,
  useStartMutation,
  useStopMutation
} from '@/features/digital-modeling/orgs/employee'
import { type EmployeeVo, listQO } from '@/features/digital-modeling/orgs/employee'
import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'

export const Route = createLazyFileRoute('/_base/digital-modeling/orgs/employee/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [selectedTreeKeys, setSelectedTreeKeys] = useState<Key[]>([])

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions:
        selectedTreeKeys.length > 0
          ? `cDepCode in (${selectedTreeKeys.map((k) => `${k}`).join(',')})`
          : undefined
    })
  )
  const startMutation = useStartMutation()
  const stopMutation = useStopMutation()
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<EmployeeVo>[]>(
    () => [
      { field: 'cPersonCode', headerName: '编码' },
      { field: 'cPersonName', headerName: '姓名' },
      { field: 'cSexTypeCode', headerName: '性别' },
      { field: 'cDepName', headerName: '部门' },
      { field: 'cProfessionalTypeName', headerName: '职务' },
      { field: 'cMobile', headerName: '手机' },
      { field: 'cEmployeeStatuCode', headerName: '账号状态' },
      { field: 'dEndLoginTime', headerName: '最后登录' },
      {
        headerName: '操作',
        width: 300,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams) => (
          <Space>
            <Link to="/404">
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={() => {}}
              >
                设置
              </Button>
            </Link>
            <Button
              size="small"
              color="primary"
              variant="text"
            >
              停用
            </Button>
            <Button
              size="small"
              color="primary"
              variant="text"
            >
              冻结
            </Button>
            <Button
              size="small"
              color="primary"
              variant="text"
            >
              解冻
            </Button>
            <Button
              size="small"
              color="primary"
              variant="text"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate([params.data.UID])}
            >
              删除
            </Button>
          </Space>
        )
      }
    ],
    [deleteMutation]
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
                deleteMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              删除
            </Button>
          </Space>
          <Space>
            <Button type="primary">修改部门</Button>
            <Button type="primary">修改职务</Button>
            <Button type="primary">停用员工</Button>
            <Button type="primary">冻结员工</Button>
            <Button type="primary">重置密码</Button>
            <Link to="/digital-modeling/orgs/employee/add">
              <Button type="primary">新增职员</Button>
            </Link>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
          <AgGridReact<EmployeeVo>
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
    </PageContainer>
  )
}
