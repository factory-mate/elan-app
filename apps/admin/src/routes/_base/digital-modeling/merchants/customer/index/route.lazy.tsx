import type { ColDef, ICellRendererParams } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'
import type { Key } from 'react'

import {
  type CustomerVo,
  listQO,
  useDeleteMutation
} from '@/features/digital-modeling/merchants/customer'
import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'

import { AddModal, EditModal, TreeArea } from './-components'
import type { EditModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/merchants/customer/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [selectedTreeKeys, setSelectedTreeKeys] = useState<Key[]>([])

  const createModal = useModal()
  const editModal = useModal<EditModalMeta>()

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions:
        selectedTreeKeys.length > 0
          ? `cCustomerCode in (${selectedTreeKeys.map((k) => `${k}`).join(',')})`
          : undefined
    })
  )

  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<CustomerVo>[]>(
    () => [
      { field: 'cCustomerCode', headerName: '客户编码' },
      { field: 'cCustomerName', headerName: '客户名称' },
      { field: 'cCustomerShortName', headerName: '客户简称' },
      { field: 'cCustomerClassCode', headerName: '所属分类' },
      { field: 'cPerson', headerName: '业务员' },
      { field: 'cPerson', headerName: '联系人' },
      { field: 'cPhone', headerName: '手机号' },
      { field: 'cAddress', headerName: '地址' },
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
          defaultSize="85%"
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
                  onClick={() => createModal.toggle()}
                >
                  新增
                </Button>
                {/* <Button type="primary">导出</Button> */}
              </Space>
            </Flex>

            <div className="ag-theme-quartz h-[calc(100vh-251px)]">
              <AgGridReact<CustomerVo>
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
                headerHeight={36}
                rowHeight={36}
                tooltipShowDelay={1000}
                tooltipHideDelay={0}
                loading={isFetching}
                noRowsOverlayComponent={() => '暂无数据'}
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
        open={createModal.open}
        setOpen={createModal.setOpen}
      />
      <EditModal
        meta={editModal.meta}
        open={editModal.open}
        setOpen={editModal.setOpen}
      />
    </PageContainer>
  )
}
