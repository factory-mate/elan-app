import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type BomContentVo, LIST_QK, listQO, useExportMutation } from '@/features/bom-content'
import * as Inventory from '@/features/inventory'

import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/report/qc/bom-content')({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const location = useLocation()

  const filterCacheStore = useFilterCacheStore()

  const gridRef = useRef<AgGridReact>(null)

  const [filterData, setFilterData] = useState<FilterForm>({
    ...filterCacheStore.getItem(location.pathname)
  })

  const { data: { data = [] } = {}, isFetching } = useQuery(
    listQO({
      cParentInvCode: filterData.cParentInvCode,
      cInvCode: filterData.cInvCode
    })
  )
  const exportMutation = useExportMutation()

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      {
        name: 'cParentInvCode',
        label: '产品编码',
        type: 'custom',
        render: () => (
          <Inventory.ProductCodeRemoteSelect
            onConfirm={(v) => {
              form.setFieldValue('cParentInvCode', v.cInvCode)
            }}
          />
        )
      },
      { name: 'cInvCode', label: '原料编码', type: 'input' }
    ],
    [form]
  )

  const columnDefs = useMemo<ColDef<BomContentVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '原料编码' },
      { field: 'cInvName', headerName: '原料名称' },
      { field: 'nQuantity', headerName: '用量' }
    ],
    []
  )

  return (
    <PageContainer>
      <FilterArea
        form={{ form }}
        filterDefs={filterDefs}
        filterData={filterData}
        setFilterData={setFilterData}
        queryKey={LIST_QK}
        shouldResetClear
        onSearch={() => {
          if (!form.getFieldValue('cParentInvCode')) {
            message.warning('请输入产品编码')
          }
        }}
      />
      <Flex
        className="h-8"
        justify="flex-end"
        align="center"
      >
        <Space>
          <PermCodeProvider code="bom-content:export">
            <Button
              type="primary"
              onClick={() => {
                const formData = form.getFieldsValue()
                if (!formData.cParentInvCode) {
                  message.warning('请输入产品编码')
                  return
                }
                exportMutation.mutate({
                  cInvCode: formData.cInvCode,
                  cParentInvCode: formData.cParentInvCode
                })
              }}
              loading={exportMutation.isPending}
              disabled={exportMutation.isPending}
            >
              导出
            </Button>
          </PermCodeProvider>
        </Space>
      </Flex>

      <div className="ag-theme-quartz flex-1">
        <AgGridReact<BomContentVo>
          ref={gridRef}
          getRowId={(params) => params.data.cInvCode!}
          columnDefs={columnDefs}
          rowData={data}
          autoSizeStrategy={{
            type: 'fitGridWidth',
            defaultMinWidth: 200
          }}
          loading={isFetching}
        />
      </div>
    </PageContainer>
  )
}
