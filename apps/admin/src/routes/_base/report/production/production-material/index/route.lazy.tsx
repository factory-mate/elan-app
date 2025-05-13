import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import { queryBuilder } from '@/features/query-builder'
import * as ProductionMaterial from '@/features/report/production/production-material'

import { FilterArea } from './-components'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/report/production/production-material/')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [filterData, setFilterData] = useState<FilterForm>({})

  const {
    data: { data = [], dataCount } = {},
    isFetching,
    isPlaceholderData
  } = useQuery(
    ProductionMaterial.listQO({
      ...pageParams,
      orderByFileds: 'cCode desc,iMaterialRow',
      conditions: queryBuilder<FilterForm>([
        { key: 'dBeginTime', type: 'date-range', val: filterData.dBeginTime },
        { key: 'cInvCode', type: 'like', val: filterData.cInvCode }
      ])
    })
  )
  const exportMutation = ProductionMaterial.useExportMutation({
    ...pageParams,
    orderByFileds: 'cCode desc,iMaterialRow',
    conditions: queryBuilder<FilterForm>([
      { key: 'dBeginTime', type: 'date-range', val: filterData.dBeginTime },
      { key: 'cInvCode', type: 'like', val: filterData.cInvCode }
    ])
  })

  const columnDefs = useMemo<ColDef<ProductionMaterial.ListVo>[]>(
    () => [
      { field: 'cCode', headerName: '生产订单号码' },
      { field: 'iRow', headerName: '行号' },
      { field: 'cDepName', headerName: '生产部门' },
      { field: 'cVouchTypeName', headerName: '生产类型' },
      { field: 'cInvCode', headerName: '产品编码' },
      { field: 'cInvName', headerName: '产品名称' },
      { field: 'cInvStd', headerName: '产品规格型号' },
      { field: 'cUnitName', headerName: '产品计量单位' },
      { field: 'nQuantity', headerName: '产品订单数量' },
      { field: 'dBeginTimeStr', headerName: '开工日期' },
      { field: 'iMaterialRow', headerName: '子件行号' },
      { field: 'cMaterialCode', headerName: '应领物料编码' },
      { field: 'cMaterialName', headerName: '应领物料名称' },
      { field: 'cMaterialStd', headerName: '应领物料规格' },
      { field: 'cMaterialUnitName', headerName: '应领计量单位' },
      { field: 'nMaterialQuantity', headerName: '应领数量' },
      { field: 'nUseQuantity', headerName: '已领数量' }
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
        <div className="ag-theme-quartz h-[calc(100vh-355px)]">
          <AgGridReact<ProductionMaterial.ListVo>
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
