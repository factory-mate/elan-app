import type { ColDef, ICellRendererParams } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'
import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type BOMAddDto,
  type BOMChildItemVo,
  type BOMVo,
  useAddMutation
} from '@/features/digital-modeling/products/bom'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const gridRef = useRef<AgGridReact>(null)
  const [tableData, setTableData] = useImmer<BOMChildItemVo[]>([])

  const [form] = Form.useForm<BOMAddDto>()

  const addMutation = useAddMutation()

  const columnDefs = useMemo<ColDef<BOMChildItemVo>[]>(
    () => [
      { field: 'iRowNumber', headerName: '子件行号', editable: true },
      { field: 'iProcessNumber', headerName: '工序行号', editable: true },
      { field: 'cInvCode', headerName: '子件编码', editable: true },
      { field: 'cInvName', headerName: '子件名称', editable: true },
      { field: 'cInvstd', headerName: '子件规格', editable: true },
      { field: 'cUnitName', headerName: '计量单位', editable: true },
      {
        field: 'iBasicQty',
        headerName: '基本用量',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 0,
          step: 1,
          showStepperButtons: true
        }
      },
      {
        field: 'iBaseQty',
        headerName: '基础用量',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 0,
          step: 1,
          showStepperButtons: true
        }
      },
      {
        field: 'iLossRate',
        headerName: '损耗率',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 0,
          step: 1,
          showStepperButtons: true
        }
      },
      {
        field: 'iUseQty',
        headerName: '使用数量',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 0,
          step: 1,
          showStepperButtons: true
        }
      },
      { field: 'iFixedQty', headerName: '固定用量', editable: true },
      { field: 'cSupplyTypeName', headerName: '供应类型', editable: true },
      { field: 'cWareHouseCode', headerName: '仓库编码', editable: true },
      { field: 'cDepName', headerName: '领料部门', editable: true },
      { field: 'cMaterialType', headerName: '物料属性', editable: true },
      {
        field: 'dEffectiveDate',
        headerName: '生效日期',
        editable: true,
        cellDataType: 'dateString'
      },
      {
        field: 'dExpirationDate',
        headerName: '失效日期',
        editable: true,
        cellDataType: 'dateString'
      },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<BOMChildItemVo>) => (
          <Space>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                setTableData((draft) => {
                  draft.splice(params.node.rowIndex! + 1, 0, {})
                })
              }}
            >
              添加
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
          </Space>
        )
      }
    ],
    [setTableData]
  )

  const onFinish: FormProps<BOMAddDto>['onFinish'] = (values) =>
    addMutation.mutate(
      {
        ...values,
        Bodys: tableData
      },
      {
        onSuccess: () => {
          setOpen?.(false)
          form.resetFields()
        }
      }
    )

  return (
    <Modal
      title="新增物料清单/配方"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="80%"
      centered
    >
      <Space
        className="w-full pl-2"
        direction="vertical"
      >
        <Form
          className="pt-3"
          name="add-form"
          form={form}
          labelCol={{ span: 6 }}
          initialValues={{}}
          onFinish={onFinish}
        >
          <Row>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cBOMTypeName"
                label="BOM 类别"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cInvCode"
                label="母件编码"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cInvName"
                label="母件名称"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cInvstd"
                label="规格型号"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cUnitName"
                label="计量单位"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cVersion"
                label="版本代号"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="dVersionDate"
                label="版本日期"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cVerisionMemo"
                label="版本说明"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cReplaceStatus"
                label="替代标识"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cReplaceMemo"
                label="替代说明"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="iStatusName"
                label="状态"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="dEffectiveDate"
                label="生效日期"
                rules={[{ required: true }]}
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
                draft.push({})
              })
            }
          >
            新增
          </Button>
        </Space>

        <div className="ag-theme-quartz h-[500px]">
          <AgGridReact<BOMChildItemVo>
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
    </Modal>
  )
}
