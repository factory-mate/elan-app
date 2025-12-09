import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useReactToPrint } from 'react-to-print'

import { type BOMCostVo, listQO, useExportMutation } from '@/features/bom-cost'

import { FilterArea } from './-components'
import styles from './-styles/print.module.scss'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/report/cost/bom-cost/')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [form] = Form.useForm()

  const [filterData, setFilterData] = useState<FilterForm>({
    isExpand: true
  })

  const reactToPrintFn = useReactToPrint({ contentRef })

  const { data, isFetching } = useQuery(
    listQO({
      ...filterData,
      iQty: filterData.iQty ? filterData.iQty : 1
    })
  )
  const exportMutation = useExportMutation()

  const columnDefs = useMemo<ColDef<BOMCostVo>[]>(
    () => [
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cInvstd', headerName: '料品规格' },
      { field: 'cUnitName', headerName: '计量单位' },
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
            <PermCodeProvider code="bom-cost:print">
              <Button
                type="primary"
                onClick={() => setTimeout(() => reactToPrintFn(), 16)}
              >
                打印
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="bom-cost:export">
              <Button
                type="primary"
                onClick={() => {
                  const formData = form.getFieldsValue()
                  exportMutation.mutate({
                    ...formData,
                    iQty: formData.iQty ? formData.iQty : 1
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

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
          <AgGridReact<BOMCostVo>
            ref={gridRef}
            getRowId={(params) => params.data.Id!}
            columnDefs={columnDefs}
            rowData={data}
            treeData
            autoGroupColumnDef={{
              headerName: '产品编码',
              minWidth: 250,
              field: 'cInvCode',
              cellRendererParams: {
                suppressCount: true
              }
            }}
            autoSizeStrategy={{
              type: 'fitGridWidth'
            }}
            treeDataChildrenField="Child"
            groupDefaultExpanded={filterData.isExpand ? -1 : 0}
            loading={isFetching}
          />
        </div>
      </Space>

      <div
        ref={contentRef}
        className={styles.printContent}
      >
        <table>
          <thead>
            <tr>
              <th>级次</th>
              <th>料品编码</th>
              <th>料品名称</th>
              <th>料品规格</th>
              <th>计量单位</th>
              <th>数量</th>
              <th>单价</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <TreeItem
                key={item.Id}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  )
}

interface TreeItemProps {
  item: BOMCostVo
}

function TreeItem(props: TreeItemProps) {
  const { item } = props
  return (
    <>
      <tr>
        <td>{new Array(item.iGrade).fill('+').join('')}</td>
        <td>{`${new Array((item.iGrade - 1) * 2).fill(String.fromCharCode(160)).join('')}${item.cInvCode}`}</td>
        <td>{item.cInvName}</td>
        <td>{item.cInvstd}</td>
        <td>{item.cUnitName}</td>
        <td>{item.iQty?.toFixed(2)}</td>
        <td>{item.iCost?.toFixed(2)}</td>
        <td>{item.iMoney?.toFixed(2)}</td>
      </tr>
      {item.Child?.map((child) => (
        <TreeItem
          key={child.Id}
          item={child}
        />
      ))}
    </>
  )
}
