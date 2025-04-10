import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { Key } from 'react'

import { listQO, type UnitVo, useDeleteMutation } from '@/features/digital-modeling/products/unit'
import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import { booleanLabelValueGetter } from '@/shared/ag-grid'

import { AddModal, EditModal, TreeArea } from './-components'
import type { EditModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [selectedTreeKeys, setSelectedTreeKeys] = useState<Key[]>([])

  const addModal = useModal()
  const editModal = useModal<EditModalMeta>()

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions:
        selectedTreeKeys.length > 0
          ? `cUnitClassCode in (${selectedTreeKeys.map((k) => `${k}`).join(',')})`
          : undefined
    })
  )
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<UnitVo>[]>(
    () => [
      { field: 'cUnitCode', headerName: '计量单位组编码' },
      { field: 'cUnitName', headerName: '计量单位组名称' },
      { field: 'iRate', headerName: '换算率' },
      {
        field: 'bMainUnit',
        headerName: '是否主计量',
        valueGetter: (params) => booleanLabelValueGetter(params.data?.bMainUnit)
      },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams) => (
          <Space>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                editModal.setMeta({ UID: params.data.UID })
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
              onClick={() => deleteMutation.mutate([params.data.UID])}
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
      <Splitter>
        <Splitter.Panel collapsible>
          <TreeArea
            selectedTreeKeys={selectedTreeKeys}
            setSelectedTreeKeys={setSelectedTreeKeys}
          />
        </Splitter.Panel>
        <Splitter.Panel
          defaultSize="80%"
          min="70%"
        >
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
                <Button
                  type="primary"
                  onClick={() => addModal.toggle()}
                >
                  新增
                </Button>
              </Space>
            </Flex>

            <div className="ag-theme-quartz h-[calc(100vh-251px)]">
              <AgGridReact<UnitVo>
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
        </Splitter.Panel>
      </Splitter>

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
