import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type CodingSchemeVo, listQO, useDeleteMutation } from '@/features/coding-scheme'

import { AddModal, EditModal } from './-components'
import type { EditModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/basic-settings/coding-scheme/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])

  const addModal = useModal()
  const editModal = useModal<EditModalMeta>()

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: undefined
    })
  )

  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<CodingSchemeVo>[]>(
    () => [
      { field: 'cProgramTypeName', headerName: '项目' },
      { field: 'iMaxGrade', headerName: '最大级数' },
      { field: 'iMaxLength', headerName: '最大长度' },
      { field: 'iOneMaxLength', headerName: '单级最大长度' },
      { field: 'iFirstLength', headerName: '第 1 级' },
      { field: 'iSecondLength', headerName: '第 2 级' },
      { field: 'iThirdLength', headerName: '第 3 级' },
      { field: 'iFouthLength', headerName: '第 4 级' },
      { field: 'iFifthLength', headerName: '第 5 级' },
      { field: 'iSixthLength', headerName: '第 6 级' },
      { field: 'iSeventhLength', headerName: '第 7 级' },
      { field: 'iEighthLength', headerName: '第 8 级' },
      { field: 'iNinthLength', headerName: '第 9 级' },
      { field: 'iTenthLength', headerName: '第 10 级' },
      { field: 'iEleventhLength', headerName: '第 11 级' },
      { field: 'iTwelfthLength', headerName: '第 12 级' },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<CodingSchemeVo>) => (
          <Space>
            <PermCodeProvider code="coding-scheme:edit">
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
            <PermCodeProvider code="coding-scheme:delete">
              <Button
                size="small"
                color="primary"
                variant="text"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate([params.data!.UID])}
              >
                删除
              </Button>
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
        <Flex
          className="h-8"
          justify="space-between"
          align="center"
        >
          <Space>
            <PermCodeProvider code="coding-scheme:delete">
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
            </PermCodeProvider>
          </Space>
          <Space>
            <PermCodeProvider code="coding-scheme:add">
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
          <AgGridReact<CodingSchemeVo>
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
