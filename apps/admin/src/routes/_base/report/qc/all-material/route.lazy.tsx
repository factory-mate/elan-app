import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type AllMaterialVo, listQO, useExportMutation } from '@/features/all-material'

import { FilterArea } from './-components'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/report/qc/all-material')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)

  const [form] = Form.useForm()

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [filterData, setFilterData] = useState<FilterForm>({})

  const {
    data: { data = [], dataCount } = {},
    isFetching,
    isPlaceholderData
  } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cInvCode', type: 'like', val: filterData.cInvCode },
        { key: 'cInvName', type: 'like', val: filterData.cInvName }
      ])
    })
  )
  const exportMutation = useExportMutation()

  const columnDefs = useMemo<ColDef<AllMaterialVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '原料编码' },
      { field: 'cInvName', headerName: '原料名称' }
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
            <PermCodeProvider code="all-material:export">
              <Button
                type="primary"
                onClick={() => {
                  const formData = form.getFieldsValue()
                  exportMutation.mutate({
                    ...pageParams,
                    conditions: queryBuilder<FilterForm>([
                      { key: 'cInvCode', type: 'like', val: formData.cInvCode },
                      { key: 'cInvName', type: 'like', val: formData.cInvName }
                    ])
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

        <div className="ag-theme-quartz h-[calc(100vh-340px)]">
          <AgGridReact<AllMaterialVo>
            ref={gridRef}
            getRowId={(params) => params.data.UID!}
            columnDefs={columnDefs}
            rowData={data}
            autoSizeStrategy={{
              type: 'fitGridWidth',
              defaultMinWidth: 200
            }}
            loading={isFetching}
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
            showTotal={(total) => `共计 ${total} 条`}
            total={dataCount}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) =>
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }
          />
        </Flex>
      </Space>
    </PageContainer>
  )
}
