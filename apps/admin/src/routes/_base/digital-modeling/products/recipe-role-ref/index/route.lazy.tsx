import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { listQO, type RecipeRoleRefVo, useDeleteMutation } from '@/features/recipe-role-ref'

import { AddModal, EditModal } from './-components'
import FilterArea from './-components/FilterArea'
import type { EditModalMeta, FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/recipe-role-ref/')({
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
  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cRoleName', type: 'like', val: filterData.cRoleName },
        { key: 'cInvCode', type: 'like', val: filterData.cInvCode },
        { key: 'cInvName', type: 'like', val: filterData.cInvName }
      ])
    })
  )
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<RecipeRoleRefVo>[]>(
    () => [
      { field: 'cRoleCode', headerName: '角色编码', width: 150 },
      { field: 'cRoleName', headerName: '角色名称', width: 150 },
      { field: 'cInvCode', headerName: '产品编码', width: 150 },
      { field: 'cInvName', headerName: '产品名称', width: 250 },
      { field: 'cInvstd', headerName: '规格型号', width: 150 },
      { field: 'iBOMStatusName', headerName: 'BOM状态', width: 150 },
      { field: 'cBOMTypeName', headerName: 'BOM类别', width: 150 },
      { field: 'cVersion', headerName: '版本代号', width: 150 },
      { field: 'dVersionDate', headerName: '版本日期', width: 200 },
      { field: 'cVerisionMemo', headerName: '版本说明', width: 200 },
      {
        headerName: '操作',
        width: 150,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<RecipeRoleRefVo>) => (
          <Space>
            <PermCodeProvider code="recipe-role-ref:edit">
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
            </PermCodeProvider>
            <PermCodeProvider code="recipe-role-ref:delete">
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
            <PermCodeProvider code="recipe-role-ref:delete">
              <Popconfirm
                title="确认执行该操作？"
                okButtonProps={{
                  disabled: deleteMutation.isPending,
                  loading: deleteMutation.isPending
                }}
                onConfirm={() => {
                  if (selectedRows.length === 0) {
                    showMessage('select-data')
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
            <PermCodeProvider code="recipe-role-ref:add">
              <Button
                type="primary"
                onClick={() => addModal.toggle()}
              >
                新增
              </Button>
            </PermCodeProvider>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
          <AgGridReact<RecipeRoleRefVo>
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
    </PageContainer>
  )
}
