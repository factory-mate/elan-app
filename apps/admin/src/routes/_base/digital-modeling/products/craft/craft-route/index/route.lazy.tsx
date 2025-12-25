import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type CraftRouteVo, listQO, useDeleteMutation } from '@/features/craft-route'

import { AddModal, EditModal } from './-components'
import FilterArea from './-components/FilterArea'
import type { EditModalMeta, FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/craft/craft-route/')({
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
        { key: 'cCraftRouteCode', type: 'like', val: filterData.cCraftRouteCode },
        { key: 'cCraftRouteName', type: 'like', val: filterData.cCraftRouteName }
      ])
    })
  )
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<CraftRouteVo>[]>(
    () => [
      { field: 'cCraftRouteCode', headerName: '工艺路线编码', flex: 1 },
      { field: 'cCraftRouteName', headerName: '工艺路线名称', flex: 1 },
      { field: 'cCreateUserName', headerName: '创建人', flex: 1 },
      { field: 'dCreateTime', headerName: '创建时间', flex: 1 },
      {
        headerName: '操作',
        width: 250,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<CraftRouteVo>) => (
          <Space>
            <PermCodeProvider code="craft-route:edit">
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
            <PermCodeProvider code="craft-route:delete">
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
            <PermCodeProvider code="craft-route:delete">
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
                  deleteMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                <Button disabled={deleteMutation.isPending}>删除</Button>
              </Popconfirm>
            </PermCodeProvider>
          </Space>
          <Space>
            <PermCodeProvider code="craft-route:add">
              <Button
                type="primary"
                onClick={() => addModal.toggle()}
              >
                新增
              </Button>
            </PermCodeProvider>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-339px)]">
          <AgGridReact<CraftRouteVo>
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
