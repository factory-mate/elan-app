import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { type BOMCostVo, listQO, useExportMutation } from '@/features/report/cost/bom-cost'

import { FilterArea } from './-components'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/report/cost/bom-cost/')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)
  const [filterData, setFilterData] = useState<FilterForm>({
    isExpand: true
  })

  const { data, isFetching } = useQuery(listQO({}))
  const exportMutation = useExportMutation({})

  const columnDefs = useMemo<ColDef<BOMCostVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '产品编码' },
      { field: 'cInvName', headerName: '名称' },
      { field: 'cInvstd', headerName: '规格型号' },
      { field: 'iQty', headerName: '数量' },
      { field: 'iCost', headerName: '单价' },
      { field: 'iMoney', headerName: '金额' }
    ],
    []
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
          justify="flex-end"
          align="center"
        >
          <Space>
            {/* <Button
              type="primary"
              onClick={() => {}}
            >
              打印
            </Button> */}
            <Button
              type="primary"
              onClick={() => exportMutation.mutate()}
              loading={exportMutation.isPending}
              disabled={exportMutation.isPending}
            >
              导出
            </Button>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
          <AgGridReact<BOMCostVo>
            ref={gridRef}
            getRowId={(params) => params.data.Id!}
            columnDefs={columnDefs}
            rowData={data}
            treeData
            autoGroupColumnDef={{
              headerName: '产品编码',
              minWidth: 340
            }}
            autoSizeStrategy={{
              type: 'fitGridWidth'
            }}
            getDataPath={(d) => (d.Child ? [d.cInvCode!] : [])}
            groupDefaultExpanded={filterData.isExpand ? -1 : 0}
            loading={isFetching}
          />
        </div>
      </Space>
    </PageContainer>
  )
}
