import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type AllMaterialVo, LIST_QK, listQO, useExportMutation } from '@/features/all-material'

import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/report/qc/all-material')({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm()
  const location = useLocation()

  const filterCacheStore = useFilterCacheStore()

  const gridRef = useRef<AgGridReact>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [filterData, setFilterData] = useState<FilterForm>({
    ...filterCacheStore.getItem(location.pathname)
  })

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

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      { name: 'cInvCode', label: '原料编码', type: 'input' },
      { name: 'cInvName', label: '原料名称', type: 'input' }
    ],
    []
  )

  const columnDefs = useMemo<ColDef<AllMaterialVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '原料编码' },
      { field: 'cInvName', headerName: '原料名称' }
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

      <div className="ag-theme-quartz flex-1">
        <AgGridReact<AllMaterialVo>
          ref={gridRef}
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
          onChange={(pageIndex, pageSize) => setPageParams({ ...pageParams, pageIndex, pageSize })}
        />
      </Flex>
    </PageContainer>
  )
}
