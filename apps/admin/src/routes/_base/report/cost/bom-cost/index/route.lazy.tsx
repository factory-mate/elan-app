import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { listQO } from '@/features/report/cost/bom-cost/queries'
import { type BOMCostDto, type BOMCostVo } from '@/features/report/cost/bom-cost/types'

export const Route = createLazyFileRoute('/_base/report/cost/bom-cost/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [filterData, setFilterData] = useState<BOMCostDto>({})

  const { data, isFetching } = useQuery(listQO({ ...filterData }))

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
            groupDefaultExpanded={-1}
            loading={isFetching}
          />
        </div>
      </Space>
    </PageContainer>
  )
}
