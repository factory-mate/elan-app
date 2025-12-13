import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { Key } from 'react'

import { type InventoryVo, listQO, useDeleteMutation } from '@/features/inventory'

import { AddModal, EditModal, TreeArea } from './-components'
import type { EditModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/inventory/')({
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
          ? `cInvClassCode in (${selectedTreeKeys.map((k) => `${k}`).join(',')})`
          : undefined
    })
  )
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<InventoryVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '料品编码' },
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cEnglishName', headerName: '英文名称' },
      { field: 'cInvstd', headerName: '规格型号' },
      { field: 'cInvClassName', headerName: '所属分类' },
      { field: 'cVendorName', headerName: '默认供应商' },
      { field: 'cUnitClassName', headerName: '计量单位组' },
      { field: 'cBuyUnitName', headerName: '采购计量单位' },
      { field: 'cSaleUnitName', headerName: '销售计量单位' },
      { field: 'cStoreUnitName', headerName: '库存计量单位' },
      { field: 'cProductUnitName', headerName: '生产计量单位' },
      { field: 'cDefindParm01', headerName: 'IFRA(R)' },
      { field: 'cDefindParm02', headerName: 'CAS' },
      { field: 'cDefindParm03', headerName: 'EINECS' },
      { field: 'cDefindParm04', headerName: 'FEMA' },
      { field: 'cDefindParm05', headerName: '天然过敏源' },
      { field: 'cDefindParm06', headerName: '天然IFRA成分' },
      { field: 'cDefindParm07', headerName: '26过敏源' },
      { field: 'cDefindParm08', headerName: '玩具过敏源' },
      { field: 'cDefindParm09', headerName: '食品过敏源' },
      { field: 'cDefindParm10', headerName: '禁用原料' },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams) => (
          <Space>
            <PermCodeProvider code="inventory:edit">
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={() => {
                  editModal.setMeta({ cInvCode: params.data.cInvCode })
                  editModal.toggle()
                }}
              >
                编辑
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="inventory:delete">
              <Button
                size="small"
                color="primary"
                variant="text"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate([params.data.UID])}
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
            orientation="vertical"
            className="w-full"
          >
            <Flex
              className="h-8"
              justify="space-between"
              align="center"
            >
              <Space>
                <PermCodeProvider code="unit:delete">
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
                <PermCodeProvider code="unit:add">
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
              <AgGridReact<InventoryVo>
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
                  type: 'fitGridWidth',
                  defaultMinWidth: 200
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
