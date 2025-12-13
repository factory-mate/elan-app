import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type BomContentVo, listQO, useExportMutation } from '@/features/bom-content'

import { FilterArea } from './-components'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/report/qc/bom-content')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)

  const [form] = Form.useForm()
  const { message } = App.useApp()

  const [filterData, setFilterData] = useState<FilterForm>({})

  const { data: { data = [] } = {}, isFetching } = useQuery(
    listQO({
      cInvCode: filterData.cInvCode,
      cParentInvCode: filterData.cParentInvCode
    })
  )
  const exportMutation = useExportMutation()

  const columnDefs = useMemo<ColDef<BomContentVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '原料编码' },
      { field: 'cInvName', headerName: '原料名称' },
      { field: 'cInvName', headerName: '用量' }
    ],
    []
  )

  return (
    <PageContainer>
      <Space
        orientation="vertical"
        className="w-full"
      >
        <FilterArea
          form={form}
          setFilterData={setFilterData}
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

        <div className="ag-theme-quartz h-[calc(100vh-300px)]">
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
      </Space>
    </PageContainer>
  )
}
