import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColGroupDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import { ProductCodeRemoteSelect } from '@/features/inventory'
import { LIST_QK, listQO, type NormalMaterialVo } from '@/features/normal-material'

interface FilterForm {
  cInvCode?: string
  cInvName?: string
}

export const Route = createLazyFileRoute('/_base/report/qc/normal-material')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)

  const [form] = Form.useForm()
  const { message } = App.useApp()

  const hasToyPermCode = usePermCode('normal-material:toy')

  const [pageParams] = useState(defaultMinPageDto)
  const [filterData, setFilterData] = useState<FilterForm>({})
  const [shouldExport, setShouldExport] = useState(false)

  const {
    data: { data = [] } = {},
    isFetching,
    isSuccess
  } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cInvCode', type: 'eq', val: filterData.cInvCode }
      ])
    })
  )

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      {
        name: 'cInvCode',
        label: '产品编码',
        type: 'custom',
        render: () => (
          <ProductCodeRemoteSelect
            onConfirm={(v) => {
              form.setFieldValue('cInvCode', v.cInvCode)
              form.setFieldValue('cInvName', v.cInvName)
            }}
          />
        )
      }
    ],
    [form]
  )

  const columnDefs = useMemo<ColGroupDef<NormalMaterialVo>[]>(
    () => [
      {
        headerName: '过敏源(PA)',
        children: [
          { field: 'PA_cInvCode', headerName: '原料编码' },
          { field: 'PA_cInvName', headerName: '原料名称' },
          { field: 'PA_nQuantity', headerName: '含量' }
        ]
      },
      {
        headerName: 'IFRA(R)',
        children: [
          { field: 'IFRA_cInvCode', headerName: '原料编码' },
          { field: 'IFRA_cInvName', headerName: '原料名称' },
          { field: 'IFRA_nQuantity', headerName: '含量' }
        ]
      },
      {
        headerName: '主要成分',
        children: [
          { field: 'Main_cInvCode', headerName: '原料编码' },
          { field: 'Main_cInvName', headerName: '原料名称' },
          { field: 'Main_nQuantity', headerName: '含量' }
        ]
      },
      {
        headerName: '玩具过敏源',
        children: [
          { field: 'Toy_cInvCode', headerName: '原料编码', hide: !hasToyPermCode },
          { field: 'Toy_cInvName', headerName: '原料名称', hide: !hasToyPermCode },
          { field: 'Toy_nQuantity', headerName: '含量', hide: !hasToyPermCode }
        ]
      },
      {
        headerName: '禁用原料',
        children: [
          { field: 'Disable_cInvCode', headerName: '原料编码' },
          { field: 'Disable_cInvName', headerName: '原料名称' },
          { field: 'Disable_nQuantity', headerName: '含量' }
        ]
      }
    ],
    [hasToyPermCode]
  )

  useEffect(() => {
    if (shouldExport && !isFetching && isSuccess) {
      setShouldExport(false)

      if (!data || !data.length) {
        message.warning('暂无数据可导出')
        return
      }

      gridRef.current!.api.exportDataAsExcel({
        fileName: '质控常规报表.xlsx',
        sheetName: '导出数据'
      })
    }
  }, [data, isFetching, isSuccess, message, shouldExport])

  return (
    <PageContainer>
      <Space
        orientation="vertical"
        className="w-full"
      >
        <FilterArea
          form={{
            form,
            onFinish: (values) => setFilterData?.({ ...values })
          }}
          filterDefs={filterDefs}
          onReset={() => setFilterData?.({})}
          queryKey={LIST_QK}
        />
        <Flex
          className="h-8"
          justify="flex-end"
          align="center"
        >
          <Space>
            <PermCodeProvider code="normal-material:export">
              <Button
                type="primary"
                onClick={() => {
                  const formData = form.getFieldsValue()
                  if (!formData.cInvCode) {
                    message.warning('请选择产品')
                    return
                  }
                  setFilterData(formData)
                  setShouldExport(true)
                }}
                loading={isFetching && shouldExport}
                disabled={isFetching && shouldExport}
              >
                导出
              </Button>
            </PermCodeProvider>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-311px)]">
          <AgGridReact<NormalMaterialVo>
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
      </Space>
    </PageContainer>
  )
}
