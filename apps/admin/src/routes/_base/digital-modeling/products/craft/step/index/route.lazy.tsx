import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import {
  listQO,
  type StepVo,
  useDeleteMutation
} from '@/features/digital-modeling/products/craft/step'
import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import { queryBuilder } from '@/features/query-builder'

import { AddModal, EditModal } from './-components'
import FilterArea from './-components/FilterArea'
import type { EditModalMeta, FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/craft/step/')({
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
        { key: 'cStepCode', type: 'like', val: filterData.cStepCode },
        { key: 'cStepName', type: 'like', val: filterData.cStepName }
      ])
    })
  )
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<StepVo>[]>(
    () => [
      { field: 'cStepCode', headerName: '工步编码', flex: 1 },
      { field: 'cStepName', headerName: '工步名称', flex: 1 },
      { field: 'isDevice', headerName: '是否对接设备', flex: 1 },
      { field: 'isBussiness', headerName: '是否对接业务', flex: 1 },
      { field: 'cCreateUserName', headerName: '创建人', flex: 1 },
      { field: 'dCreateTime', headerName: '创建时间', flex: 1 },
      {
        headerName: '操作',
        width: 250,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<StepVo>) => (
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
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate([params.data!.UID])}
            >
              删除
            </Button>
          </Space>
        )
      }
    ],
    [deleteMutation, editModal]
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
          <AgGridReact<StepVo>
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
