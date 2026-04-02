import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { listQO, useDeleteMutation, type WeightVo } from '@/features/weight'

import { AddModal, EditModal } from './-components'
import type { EditModalMeta, FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/workshop-mgt/workshop-config/weight/')({
  component: RouteComponent
})

function RouteComponent() {
  // const [form] = Form.useForm()
  const { showMessage } = useMessage()
  // const location = useLocation()

  // const filterCacheStore = useFilterCacheStore()

  const gridRef = useRef<AgGridReact>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  // const [filterData, setFilterData] = useState<FilterForm>({
  //   ...filterCacheStore.getItem(location.pathname)
  // })
  const addModal = useModal()
  const editModal = useModal<EditModalMeta>()

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([])
    })
  )
  const deleteMutation = useDeleteMutation()

  // const filterDefs = useMemo<FilterDef<FilterForm>[]>(() => [], [])

  const columnDefs = useMemo<ColDef<WeightVo>[]>(
    () => [
      { field: 'ScaleQuantity', headerName: '称最大计量', flex: 1 },
      { field: 'iErrorQuantity', headerName: '误差范围', flex: 1 },
      { field: 'cMemo', headerName: '备注', flex: 1, tooltipField: 'cMemo' },
      {
        headerName: '操作',
        width: 250,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<WeightVo>) => (
          <Space>
            <PermCodeProvider code="weight:edit">
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
            <PermCodeProvider code="weight:delete">
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
          <PermCodeProvider code="weight:delete">
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
          <PermCodeProvider code="weight:add">
            <Button
              type="primary"
              onClick={() => addModal.toggle()}
            >
              新增
            </Button>
          </PermCodeProvider>
        </Space>
      </Flex>

      <div className="ag-theme-quartz flex-1">
        <AgGridReact<WeightVo>
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
