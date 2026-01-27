import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ValueFormatterParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type BOMChangeVo, LIST_QK, listQO } from '@/features/bom-change'
import * as Inventory from '@/features/inventory'

import { ReplaceModal } from './-components'
import type { FilterForm, ReplaceModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/bom-change')({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm()
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  // const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})

  const replaceModal = useModal<ReplaceModalMeta>({
    meta: { UIDs: [] }
  })

  const { data = [], isFetching } = useQuery(
    listQO({
      conditions: queryBuilder<FilterForm>([
        { key: 'cInvCode', type: 'eq', val: filterData.cInvCode }
      ]),
      orderByFileds: 'cParentCode,cParentVersion'
    })
  )

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      {
        name: 'cInvCode',
        label: '子件编码',
        type: 'custom',
        render: () => (
          <Inventory.MaterialCodeRemoteSelect
            onConfirm={(v) => {
              form.setFieldValue('cInvCode', v.cInvCode)
            }}
          />
        )
      }
    ],
    [form]
  )

  const columnDefs = useMemo<ColDef<BOMChangeVo>[]>(
    () => [
      { field: 'cParentCode', headerName: '产品编码' },
      { field: 'cParentName', headerName: '产品名称' },
      { field: 'cInvstd', headerName: '规格型号' },
      { field: 'cParentVersion', headerName: 'BOM 版本' },
      {
        field: 'cParentdEffectiveDate',
        headerName: '生效日期',
        cellDataType: 'dateString',
        valueFormatter: (params: ValueFormatterParams) =>
          DateUtils.formatTime(params.value, 'YYYY-MM-DD')
      },
      {
        field: 'cParentdExpirationDate',
        headerName: '失效日期',
        cellDataType: 'dateString',
        valueFormatter: (params: ValueFormatterParams) =>
          DateUtils.formatTime(params.value, 'YYYY-MM-DD')
      },
      { field: 'cParentiStatusName', headerName: 'BOM 状态' }
    ],
    []
  )

  return (
    <PageContainer>
      <FilterArea
        form={{
          form,
          onFinish: (values) => setFilterData?.({ ...values })
        }}
        filterDefs={filterDefs}
        onReset={() => {
          setFilterData?.({})
          queryClient.resetQueries({ queryKey: [LIST_QK] })
        }}
        queryKey={LIST_QK}
      />
      <Flex
        className="h-8"
        justify="space-between"
        align="center"
      >
        <Space>
          <PermCodeProvider code="bom-change:replace">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                replaceModal.setMeta({ UIDs: selectedRows.map((i) => i.UID) })
                replaceModal.toggle()
              }}
            >
              替代
            </Button>
          </PermCodeProvider>
        </Space>
      </Flex>

      <div className="ag-theme-quartz flex-1">
        <AgGridReact<BOMChangeVo>
          ref={gridRef}
          getRowId={(params) => params.data.UID}
          columnDefs={columnDefs}
          rowData={data}
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
          // disabled={isPlaceholderData}
          showSizeChanger
          showQuickJumper
          showTotal={(total) =>
            selectedRows.length > 0
              ? `已选中 ${selectedRows.length} 条，共计 ${total} 条`
              : `共计 ${total} 条`
          }
          // total={data?.dataCount}
          // pageSize={pageParams.pageSize}
          pageSizeOptions={defaultPageSizeOptions}
          // onChange={(pageIndex, pageSize) => {
          //   setSelectedRows(gridRef.current!.api.getSelectedRows())
          //   setPageParams({ ...pageParams, pageIndex, pageSize })
          // }}
        />
      </Flex>

      <ReplaceModal
        meta={replaceModal.meta}
        open={replaceModal.open}
        setOpen={replaceModal.setOpen}
      />
    </PageContainer>
  )
}
