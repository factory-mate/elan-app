import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { FormProps } from 'antd'

import * as Dicts from '@/features/dicts'
import * as Department from '@/features/digital-modeling/orgs/department'
import * as BOM from '@/features/digital-modeling/products/bom'
import * as Inventory from '@/features/digital-modeling/products/inventory'
import { defaultMaxPageDto } from '@/features/pagination'
import * as ProductionOrder from '@/features/production-plan/production-order'

export const Route = createLazyFileRoute('/_base/production-plan/production-order/add')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)
  const tabbarStore = useTabbarStore()
  const navigate = useNavigate()
  const match = Route.useMatch()

  const [tableData, setTableData] = useImmer<ProductionOrder.ProductionOrderBody[]>([])

  const [form] = Form.useForm<ProductionOrder.ProductionOrderHead>()

  const { data: bomCandidates } = useSuspenseQuery(Dicts.fullListQO('BOMType'))
  const { data: standardTypeCandidates } = useSuspenseQuery(
    Dicts.fullListQO('ProductVouchStandardType')
  )
  const { data: vouchTypeCandidates } = useSuspenseQuery(Dicts.fullListQO('ProductVouchType'))
  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )
  const { data: { data: inventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMaxPageDto,
      conditions: 'IsProduct = true'
    })
  )

  const addMutation = ProductionOrder.useAddMutation()

  const columnDefs = useMemo<ColDef<ProductionOrder.ProductionOrderBody>[]>(
    () => [
      // {
      //   field: 'cSourceCode',
      //   headerName: '行号',
      //   valueGetter: (params) => (params.node!.rowIndex ?? 0) + 1
      // },
      {
        field: 'cDefindParm04',
        headerName: '生产部门',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cDefindParm04}
            options={departmentCandidates}
            fieldNames={Department.departmentSelectFieldNames}
            onSelect={(value, option) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cDefindParm04: value,
                  cDefindParm05: option.cDepName
                }
              })
            }}
          />
        )
      },
      {
        field: 'cInvCode',
        headerName: '料品编码',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cInvCode}
            options={inventoryCandidates}
            fieldNames={{
              value: 'cInvCode',
              label: 'cInvCode'
            }}
            showSearch
            filterOption={(input, option) =>
              (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
              (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onSelect={async (value, option) => {
              const { data: versionCandidates = [] } = await queryClient.ensureQueryData(
                BOM.listQO({
                  ...defaultMaxPageDto,
                  conditions: `cInvCode=${value} && iStatus=1 && dEffectiveDate<=${DateUtils.formatTime(new Date(), 'YYYY-MM-DD')} && dExpirationDate>=${DateUtils.formatTime(new Date(), 'YYYY-MM-DD')}`,
                  orderByFileds: 'dCreateTime desc'
                })
              )
              const matchedBom = versionCandidates.at(0)
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cInvCode: value,
                  cInvName: option.cInvName,
                  cInvStd: option.cInvstd,
                  cUnitCode: option.cProductUnitCode,
                  cUnitName: option.cProductUnitName,
                  cBomUID: matchedBom?.UID ?? undefined,
                  cBomVersion: matchedBom?.cVersion ?? undefined,
                  cVerisionMemo: matchedBom?.cVerisionMemo ?? undefined,
                  versionCandidates
                }
              })
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cInvCode}</span>
                <span> {option.data.cInvName}</span>
              </Flex>
            )}
          />
        )
      },
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cInvStd', headerName: '规格型号' },
      { field: 'cUnitName', headerName: '计量单位' },
      {
        field: 'nQuantity',
        headerName: '生产数量',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 0,
          step: 1,
          showStepperButtons: true
        }
      },
      { field: 'dBeginTime', headerName: '开工时间', editable: true, cellDataType: 'dateString' },
      { field: 'dEndTime', headerName: '完工时间', editable: true, cellDataType: 'dateString' },
      {
        field: 'cBomType',
        headerName: 'BOM类型',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cBomType}
            options={bomCandidates}
            fieldNames={Dicts.dictSelectFieldNames}
            onSelect={(value) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cBomType: value
                }
              })
            }}
          />
        )
      },

      {
        field: 'cBomVersion',
        headerName: 'BOM版本',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cBomVersion}
            options={params.data?.versionCandidates}
            fieldNames={{
              value: 'cVersion',
              label: 'cVersion'
            }}
            onSelect={(value, option) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cBomVersion: value,
                  cBomUID: option.UID,
                  cVerisionMemo: option.cVerisionMemo
                }
              })
            }}
          />
        )
      },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) => (
          <Space>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                setTableData((draft) => {
                  draft.splice(params.node.rowIndex! + 1, 0, {
                    dBeginTime: DateUtils.formatTime(form.getFieldValue('dDate'), 'YYYY-MM-DD'),
                    dEndTime: DateUtils.formatTime(
                      DateUtils.dayjs(form.getFieldValue('dDate')).add(1, 'day'),
                      'YYYY-MM-DD'
                    ),
                    cBomType: ProductionOrder.BOMType.STANDARD,
                    bodyss: []
                  })
                })
              }}
            >
              增行
            </Button>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                setTableData((draft) => {
                  draft.splice(params.node.rowIndex!, 1)
                })
              }}
            >
              删行
            </Button>
          </Space>
        )
      }
    ],
    [departmentCandidates, setTableData, inventoryCandidates, bomCandidates, form]
  )

  const onFinish: FormProps<ProductionOrder.ProductionOrderHead>['onFinish'] = (values) =>
    addMutation.mutate(
      {
        head: { ...values },
        bodys: tableData
      },
      {
        onSuccess: () => {
          navigate({ to: '/production-plan/production-order' })
          tabbarStore.removeItem(match.fullPath)
        }
      }
    )

  return (
    <PageContainer>
      <Space
        direction="vertical"
        className="w-full"
      >
        <Flex
          className="h-8"
          justify="flex-end"
          align="center"
        >
          <Space>
            <Button
              type="primary"
              disabled={addMutation.isPending}
              loading={addMutation.isPending}
              onClick={() => form.submit()}
            >
              保存
            </Button>
          </Space>
        </Flex>

        <Form
          className="pt-3"
          name="add-form"
          form={form}
          labelCol={{ span: 6 }}
          initialValues={{
            dDate: dayjs(new Date())
          }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={8}>
              <Form.Item<ProductionOrder.ProductionOrderHead>
                name="cCode"
                label="生产订单号"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<ProductionOrder.ProductionOrderHead>
                name="cStandardType"
                label="生产订单类型"
              >
                <Select
                  options={standardTypeCandidates}
                  fieldNames={Dicts.dictSelectFieldNames}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<ProductionOrder.ProductionOrderHead>
                name="cVouchType"
                label="生产订单类别"
              >
                <Select
                  options={vouchTypeCandidates}
                  fieldNames={Dicts.dictSelectFieldNames}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<ProductionOrder.ProductionOrderHead>
                name="cDefindParm01"
                label="生产工厂"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<ProductionOrder.ProductionOrderHead>
                name="dDate"
                label="订单日期"
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Space>
          <Button
            type="primary"
            onClick={() =>
              setTableData((draft) => {
                draft.push({
                  dBeginTime: DateUtils.formatTime(form.getFieldValue('dDate'), 'YYYY-MM-DD'),
                  dEndTime: DateUtils.formatTime(
                    DateUtils.dayjs(form.getFieldValue('dDate')).add(1, 'day'),
                    'YYYY-MM-DD'
                  ),
                  cBomType: ProductionOrder.BOMType.STANDARD,
                  bodyss: []
                })
              })
            }
          >
            增行
          </Button>
        </Space>

        <div className="ag-theme-quartz h-[calc(100vh-210px)]">
          <AgGridReact<ProductionOrder.ProductionOrderBody>
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={tableData}
            editType="fullRow"
          />
        </div>
      </Space>
    </PageContainer>
  )
}
