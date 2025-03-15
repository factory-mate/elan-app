import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useAsyncEffect } from 'ahooks'
import type { FormProps } from 'antd'

import * as Dicts from '@/features/dicts'
import * as Department from '@/features/digital-modeling/orgs/department'
import * as BOM from '@/features/digital-modeling/products/bom'
import * as Inventory from '@/features/digital-modeling/products/inventory'
import { defaultMaxPageDto } from '@/features/pagination'
import {
  BOMType,
  detailBodysQO,
  detailBodyssQO,
  detailQO,
  type ProductionOrderBody,
  type ProductionOrderHead,
  useEditMutation
} from '@/features/production-plan/production-order'

import { ChildListModal } from './-components'

export const Route = createLazyFileRoute('/_base/production-plan/production-order/$id/edit')({
  component: RouteComponent
})

function RouteComponent() {
  const gridRef = useRef<AgGridReact>(null)
  const tabbarStore = useTabbarStore()
  const navigate = useNavigate()
  const { id } = Route.useParams()
  const match = Route.useMatch()

  const [tableData, setTableData] = useImmer<ProductionOrderBody[]>([])
  const currentOperateRow = useRef<ProductionOrderBody | null>(null)
  const currentOperateRowIndex = useRef<number>(-1)

  const [form] = Form.useForm<ProductionOrderHead>()

  const childListModal = useModal()

  const { data: bomCandidates } = useSuspenseQuery(Dicts.fullListQO('BOMType'))
  const { data: vouchCandidates } = useSuspenseQuery(Dicts.fullListQO('ProductVouchStandardType'))
  const { data: detailData } = useSuspenseQuery(detailQO(id))
  const { data: detailBodysData } = useSuspenseQuery(detailBodysQO(id))
  const editMutation = useEditMutation()
  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )
  const { data: { data: inventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMaxPageDto,
      conditions: 'IsProduct = true'
    })
  )

  const columnDefs = useMemo<ColDef<ProductionOrderBody>[]>(
    () => [
      {
        field: 'cSourceCode',
        headerName: '行号',
        valueGetter: (params) => (params.node!.rowIndex ?? 0) + 1
      },
      {
        field: 'cInvName',
        headerName: '车间',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrderBody>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cDefindParm04}
            options={departmentCandidates}
            fieldNames={Department.departmentSelectFieldNames}
            onSelect={(value) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cDefindParm04: value
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
        cellRenderer: (params: ICellRendererParams<ProductionOrderBody>) => (
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
                  cBomUID: option.UID,
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
        cellRenderer: (params: ICellRendererParams<ProductionOrderBody>) => (
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
        editable: true,
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrderBody>) => (
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
        cellRenderer: (params: ICellRendererParams<ProductionOrderBody>) => (
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
                    cBomType: BOMType.STANDARD,
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
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                currentOperateRow.current = params.node.data ?? null
                currentOperateRowIndex.current = params.node.rowIndex ?? -1
                childListModal.toggle()
              }}
            >
              子件
            </Button>
          </Space>
        )
      }
    ],
    [bomCandidates, childListModal, departmentCandidates, form, inventoryCandidates, setTableData]
  )

  const onFinish: FormProps<ProductionOrderHead>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...detailData,
        ...values,
        bodys: tableData
      },
      {
        onSuccess: () => {
          navigate({ to: '/production-plan/production-order' })
          tabbarStore.removeItem(match.fullPath)
        }
      }
    )

  useAsyncEffect(async () => {
    form.setFieldsValue(detailData ?? {})
    setTableData(detailBodysData ?? [])
    const results = await Promise.all(
      detailBodysData.map((i) => queryClient.ensureQueryData(detailBodyssQO(i.MID)))
    )
    setTableData((draft) => {
      results.forEach((result, index) => {
        draft[index] = {
          ...draft[index],
          bodyss: result
        }
      })
    })
  }, [id])

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
              disabled={editMutation.isPending}
              loading={editMutation.isPending}
              onClick={() => form.submit()}
            >
              保存
            </Button>
          </Space>
        </Flex>

        <Form
          className="pt-3"
          name="edit-form"
          form={form}
          labelCol={{ span: 6 }}
          initialValues={{}}
          onFinish={onFinish}
        >
          <Row>
            <Col span={8}>
              <Form.Item<ProductionOrderHead>
                name="cVouchType"
                label="生产订单类别"
              >
                <Select
                  options={vouchCandidates}
                  fieldNames={Dicts.dictSelectFieldNames}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<ProductionOrderHead>
                name="cDefindParm01"
                label="生产工厂"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<ProductionOrderHead>
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
                  cBomType: BOMType.STANDARD,
                  bodyss: []
                })
              })
            }
          >
            增行
          </Button>
        </Space>

        <div className="ag-theme-quartz h-[calc(100vh-210px)]">
          <AgGridReact<ProductionOrderBody>
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={tableData}
            editType="fullRow"
          />
        </div>
      </Space>

      <ChildListModal
        open={childListModal.open}
        setOpen={childListModal.setOpen}
        currentOperateRow={currentOperateRow}
        onSave={(data) => {
          if (data && currentOperateRowIndex.current > -1) {
            setTableData((draft) => {
              draft[currentOperateRowIndex.current] = {
                ...data,
                bodyss: [...(data.bodyss ?? [])]
              }
            })
          }
        }}
      />
    </PageContainer>
  )
}
