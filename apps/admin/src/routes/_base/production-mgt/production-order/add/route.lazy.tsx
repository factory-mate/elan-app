import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { FormProps } from 'antd'

import * as BOM from '@/features/bom'
import * as Department from '@/features/department'
import * as Dicts from '@/features/dicts'
import * as Inventory from '@/features/inventory'
import * as ProductionOrder from '@/features/production-order'

export const Route = createLazyFileRoute('/_base/production-mgt/production-order/add')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)
  const tabbarStore = useTabbarStore()
  const navigate = useNavigate()
  const match = Route.useMatch()

  const [tableData, setTableData] = useImmer<ProductionOrder.ProductionOrderBody[]>([])

  const [form] = Form.useForm<ProductionOrder.ProductionOrderHead>()

  const { data: bomCandidates } = useQuery(Dicts.fullListQO('BOMType'))
  const { data: standardTypeCandidates } = useQuery(Dicts.fullListQO('ProductVouchStandardType'))
  const { data: vouchTypeCandidates } = useQuery(Dicts.fullListQO('ProductVouchType'))
  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )

  const addMutation = ProductionOrder.useAddMutation()

  const columnDefs = useMemo<ColDef<ProductionOrder.ProductionOrderBody>[]>(
    () => [
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
            fieldNames={{
              label: 'cDepName',
              value: 'cDepCode'
            }}
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
          <Inventory.ProductCodeRemoteSelect
            className="size-full"
            variant="borderless"
            allowClear={false}
            button={{ type: 'link' }}
            value={params.data?.cInvCode}
            onConfirm={async (v) => {
              const { data: versionCandidates = [] } = await queryClient.fetchQuery(
                BOM.listQO({
                  ...defaultMaxPageDto,
                  conditions: queryBuilder([
                    { key: 'cInvCode', type: 'eq', val: v.cInvCode },
                    { key: 'iStatus', type: 'eq', val: 1 },
                    {
                      key: 'dEffectiveDate',
                      type: 'lte',
                      val: DateUtils.formatTime(new Date(), 'YYYY-MM-DD')
                    },
                    {
                      key: 'dExpirationDate',
                      type: 'gte',
                      val: DateUtils.formatTime(new Date(), 'YYYY-MM-DD')
                    }
                  ]),
                  orderByFileds: 'dCreateTime desc'
                })
              )
              const matchedBom = versionCandidates.at(0)
              params.api.applyTransaction({
                update: [
                  {
                    ...params.data,
                    cInvCode: v.cInvCode,
                    cInvName: v.cInvName,
                    cInvStd: v.cInvstd,
                    cUnitCode: v.cProductUnitCode,
                    cUnitName: v.cProductUnitName,
                    cBomUID: matchedBom?.UID ?? undefined,
                    cBomVersion: matchedBom?.cVersion ?? undefined,
                    cVerisionMemo: matchedBom?.cVerisionMemo ?? undefined,
                    versionCandidates
                  }
                ]
              })
            }}
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
            fieldNames={{
              label: 'cDictonaryName',
              value: 'cDictonaryCode'
            }}
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
    [departmentCandidates, setTableData, bomCandidates, form]
  )

  const onFinish: FormProps<ProductionOrder.ProductionOrderHead>['onFinish'] = (values) =>
    addMutation.mutate(
      {
        head: { ...values },
        bodys: tableData
      },
      {
        onSuccess: () => {
          navigate({ to: '/production-mgt/production-order' })
          tabbarStore.removeItem(match.fullPath)
        }
      }
    )

  return (
    <PageContainer>
      <Space
        orientation="vertical"
        className="w-full"
      >
        <Flex
          className="h-8"
          justify="flex-end"
          align="center"
        >
          <Space>
            <PermCodeProvider code="production-order:add">
              <Button
                type="primary"
                disabled={addMutation.isPending}
                loading={addMutation.isPending}
                onClick={() => form.submit()}
              >
                保存
              </Button>
            </PermCodeProvider>
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
                  fieldNames={{
                    label: 'cDictonaryName',
                    value: 'cDictonaryCode'
                  }}
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
                  fieldNames={{
                    label: 'cDictonaryName',
                    value: 'cDictonaryCode'
                  }}
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

        <div className="ag-theme-quartz h-[calc(100vh-381px)]">
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
