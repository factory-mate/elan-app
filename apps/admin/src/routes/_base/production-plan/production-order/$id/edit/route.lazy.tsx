import type { ColDef, ICellRendererParams } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'
import { useAsyncEffect } from 'ahooks'
import type { FormProps } from 'antd'

import {
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

  const { data: detailData } = useSuspenseQuery(detailQO(id))
  const { data: detailBodysData } = useSuspenseQuery(detailBodysQO(id))
  const editMutation = useEditMutation()

  const columnDefs = useMemo<ColDef<ProductionOrderBody>[]>(
    () => [
      { field: 'cSourceCode', headerName: '行号', editable: true },
      // { field: 'cVouchTypeName', headerName: '类型' },
      { field: 'cInvName', headerName: '车间', editable: true },
      // { field: 'iStatus', headerName: '状态' },
      { field: 'cInvCode', headerName: '料品编码', editable: true },
      { field: 'cInvName', headerName: '料品名称', editable: true },
      { field: 'cInvStd', headerName: '规格型号', editable: true },
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
      { field: 'cUnitName', headerName: '计量单位', editable: true },
      { field: 'dBeginTime', headerName: '开工时间', editable: true, cellDataType: 'dateString' },
      { field: 'dEndTime', headerName: '完工时间', editable: true, cellDataType: 'dateString' },
      { field: 'cBomType', headerName: 'BOM类型', editable: true },
      { field: 'cBomVersion', headerName: 'BOM版本', editable: true },
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
                    bodyss: []
                  })
                })
              }}
            >
              新增
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
              删除
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
    [childListModal, setTableData]
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
                <Input />
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
                  bodyss: []
                })
              })
            }
          >
            新增
          </Button>
        </Space>

        <div className="ag-theme-quartz h-[calc(100vh-210px)]">
          <AgGridReact<ProductionOrderBody>
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={tableData}
            headerHeight={36}
            rowHeight={36}
            tooltipShowDelay={1000}
            tooltipHideDelay={0}
            noRowsOverlayComponent={() => '暂无数据'}
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