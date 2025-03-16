import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import {
  listQO,
  type RoleVo,
  useDeleteMutation,
  useStartMutation,
  useStopMutation
} from '@/features/perm-management/roles'
import { queryBuilder } from '@/features/query-builder'

import { AddModal, EditModal, SetPermsModal } from './-components'
import FilterArea from './-components/FilterArea'
import type { EditModalMeta, FilterForm, SetPermsModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/perm-management/roles/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})

  const addModal = useModal()
  const editModal = useModal<EditModalMeta>()
  const setPermsModal = useModal<SetPermsModalMeta>()

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cRoleCode', type: 'like', val: filterData.cRoleCode },
        { key: 'cRoleName', type: 'like', val: filterData.cRoleName }
      ])
    })
  )
  const deleteMutation = useDeleteMutation()
  const startMutation = useStartMutation()
  const stopMutation = useStopMutation()

  const columnDefs = useMemo<ColDef<RoleVo>[]>(
    () => [
      { field: 'cRoleCode', headerName: '角色编码' },
      { field: 'cRoleName', headerName: '角色名称' },
      {
        field: 'IsValid',
        headerName: '是否启用',
        editable: true,
        cellDataType: 'boolean',
        onCellValueChanged: (event) => {
          if (event.newValue) {
            startMutation.mutate([event.data.UID])
          } else {
            stopMutation.mutate([event.data.UID])
          }
        }
      },
      { field: 'cMemo', headerName: '备注', tooltipField: 'cMemo' },
      {
        headerName: '操作',
        width: 250,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<RoleVo>) => (
          <Space>
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
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                setPermsModal.setMeta({ cRoleCode: params.data!.cRoleCode })
                setPermsModal.toggle()
              }}
            >
              权限配置
            </Button>
            <Button
              size="small"
              color="primary"
              variant="text"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate([params.data!.UID])}
            >
              删除
            </Button>
          </Space>
        )
      }
    ],
    [deleteMutation, editModal, setPermsModal, startMutation, stopMutation]
  )

  return (
    <PageContainer>
      <Space
        direction="vertical"
        className="w-full"
      >
        <FilterArea setFilterData={setFilterData} />
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
            <Button
              type="primary"
              onClick={() => addModal.toggle()}
            >
              新增
            </Button>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
          <AgGridReact<RoleVo>
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

      <AddModal
        open={addModal.open}
        setOpen={addModal.setOpen}
      />
      <EditModal
        meta={editModal.meta}
        open={editModal.open}
        setOpen={editModal.setOpen}
      />
      <SetPermsModal
        meta={setPermsModal.meta}
        open={setPermsModal.open}
        setOpen={setPermsModal.setOpen}
      />
    </PageContainer>
  )
}
