import type { ColDef, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community'
import { AgGridReact, type CustomCellRendererProps } from 'ag-grid-react'
import { type FormProps, Modal } from 'antd'
import Decimal from 'decimal.js'
import type { Dispatch, SetStateAction } from 'react'

import * as Dicts from '@/features/dicts'
import * as Department from '@/features/digital-modeling/orgs/department'
import {
  type BOMAddDto,
  type BOMChildItemVo,
  type BOMVo,
  DEFAULT_EXPIRATION_DATE,
  DEFAULT_PROCESS_NUMBER,
  supplyTypeLabelMap,
  supplyTypeOptions,
  useAddMutation
} from '@/features/digital-modeling/products/bom'
import * as Inventory from '@/features/digital-modeling/products/inventory'
import * as Warehouse from '@/features/digital-modeling/products/warehouse'
import { BooleanValue } from '@/features/general'
import { defaultMaxPageDto } from '@/features/pagination'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const { message } = useMessage()

  const gridRef = useRef<AgGridReact<BOMChildItemVo>>(null)
  const [tableData, setTableData] = useImmer<BOMChildItemVo[]>([])

  const [form] = Form.useForm<BOMAddDto>()
  const parentQuantity = Form.useWatch('nQuantity', form)

  const { data: bomCandidates } = useSuspenseQuery(Dicts.fullListQO('BOMType'))
  const { data: { data: parentInventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMaxPageDto,
      conditions: 'IsProduct = true'
    })
  )
  const { data: { data: childInventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMaxPageDto,
      conditions: 'IsMaterial = true'
    })
  )
  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )
  const { data: { data: warehouseCandidates } = {} } = useQuery(Warehouse.listQO(defaultMaxPageDto))

  const addMutation = useAddMutation()

  const columnDefs = useMemo<ColDef<BOMChildItemVo>[]>(
    () => [
      {
        field: 'iRowNumber',
        headerName: '子件行号'
      },
      { field: 'iProcessNumber', headerName: '工序行号', editable: true },
      {
        field: 'cInvCode',
        headerName: '子件编码',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<BOMChildItemVo>) => (
          //           <AutoComplete
          //   className="size-full"
          //   variant="borderless"
          //   fieldNames={{
          //     value: 'cInvCode',
          //     label: 'cInvCode'
          //   }}
          //   options={childInventoryOptions}
          //   optionRender={(option) => (
          //     <Flex justify="space-between">
          //       <span>{option.data.cInvCode}</span>
          //       <span> {option.data.cInvName}</span>
          //     </Flex>
          //   )}
          //   onSearch={async (value) => {
          //     if (!value) {
          //       setChildInventoryOptions([...(childInventoryCandidates ?? [])])
          //     }
          //     try {
          //       const options =
          //         (await queryClient.fetchQuery(
          //           Inventory.listQO({
          //             ...defaultMinPageDto,
          //             conditions: queryBuilder([
          //               { key: 'cInvCode', type: 'like', val: value },
          //               { key: 'IsMaterial', type: 'eq', val: 'true' }
          //             ])
          //           })
          //         )) ?? []
          //       setChildInventoryOptions([...options.data])
          //     } catch {
          //       setChildInventoryOptions([...[]])
          //     }
          //   }}
          // />
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cInvCode}
            options={childInventoryCandidates}
            fieldNames={{
              value: 'cInvCode',
              label: 'cInvCode'
            }}
            showSearch
            filterOption={(input, option) =>
              (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
              (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onSelect={(value, option) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cInvCode: value,
                  cInvName: option.cInvName,
                  cInvstd: option.cInvstd,
                  cUnitCode: option.cSaleUnitCode,
                  cUnitName: option.cSaleUnitName
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
      { field: 'cInvName', headerName: '子件名称' },
      { field: 'cEnglishName', headerName: '英文名称' },
      { field: 'cInvstd', headerName: '子件规格' },
      { field: 'cUnitName', headerName: '计量单位' },
      {
        field: 'iBasicQty',
        headerName: '基本用量',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 8
        }
      },
      {
        field: 'iBaseQty',
        headerName: '基础用量',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 8
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
        headerName: '单位用量',
        valueGetter: (params) => {
          if (params.data?.iBaseQty && params.data?.iBasicQty && parentQuantity) {
            const iBaseQty = new Decimal(params.data?.iBaseQty)
            const iBasicQty = new Decimal(params.data?.iBasicQty)
            return iBasicQty.dividedBy(iBaseQty.times(parentQuantity)).toNumber()
          }
          return undefined
        },
        cellEditorParams: {
          precision: 8
        }
      },
      {
        field: 'iFixedQty',
        headerName: '固定用量',
        cellRenderer: (params: CustomCellRendererProps) => (
          <Switch
            value={params.value === BooleanValue.TRUE}
            onClick={(value) => {
              const itemsToUpdate: BOMChildItemVo[] = []
              gridRef.current!.api.forEachNodeAfterFilterAndSort((rowNode, index) => {
                if (index === params.node.rowIndex) {
                  const { data = {} } = rowNode
                  data.iFixedQty = value ? BooleanValue.TRUE : BooleanValue.FALSE
                  itemsToUpdate.push(data)
                }
              })
              gridRef.current!.api.applyTransaction({
                update: itemsToUpdate
              })
            }}
          />
        )
      },
      {
        field: 'cSupplyTypeName',
        headerName: '供应类型',
        cellRenderer: (params: CustomCellRendererProps<BOMChildItemVo>) =>
          supplyTypeLabelMap.get(params.data?.cSupplyType ?? ''),
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: supplyTypeOptions
        }
      },
      {
        field: 'cWareHouseCode',
        headerName: '仓库编码',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<BOMChildItemVo>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cWareHouseCode}
            options={warehouseCandidates}
            fieldNames={{
              value: 'cWareHouseCode',
              label: 'cWareHouseCode'
            }}
            onSelect={(value, option) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cWareHouseCode: value,
                  cWareHouseName: option.cWareHouseName
                }
              })
            }}
          />
        )
      },
      { field: 'cWareHouseName', headerName: '仓库名称' },
      {
        field: 'cDepName',
        headerName: '领料部门',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<BOMChildItemVo>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cDepCode}
            options={departmentCandidates}
            fieldNames={Department.departmentSelectFieldNames}
            onSelect={(value, option) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cDepCode: value,
                  cDepName: option.cDepName
                }
              })
            }}
          />
        )
      },
      {
        field: 'cMaterialType',
        headerName: '物料属性',
        valueFormatter: (params: ValueFormatterParams) => (params.data.IsProduct ? '自制' : '采购')
      },
      {
        field: 'dEffectiveDate',
        headerName: '生效日期',
        editable: true,
        cellDataType: 'dateString',
        valueFormatter: (params: ValueFormatterParams) =>
          DateUtils.formatTime(params.value, 'YYYY-MM-DD')
      },
      {
        field: 'dExpirationDate',
        headerName: '失效日期',
        editable: true,
        cellDataType: 'dateString',
        valueFormatter: (params: ValueFormatterParams) =>
          DateUtils.formatTime(params.value, 'YYYY-MM-DD')
      },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<BOMChildItemVo>) => (
          <Space>
            {params.node.rowIndex! + 1 < tableData.length && (
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={() => {
                  const iRowNumber = `${+params.data!.iRowNumber! + 1}`
                  if (tableData.some((i) => i.iRowNumber === iRowNumber)) {
                    message.warning('当前行号已存在，无法增行')
                    return
                  }
                  setTableData((draft) => {
                    draft.splice(params.node.rowIndex! + 1, 0, {
                      iRowNumber,
                      iProcessNumber: DEFAULT_PROCESS_NUMBER,
                      iBasicQty: 100,
                      iBaseQty: 1,
                      iUseQty: 1,
                      iLossRate: 0,
                      iFixedQty: 0,
                      cSupplyType: '1',
                      dEffectiveDate: DateUtils.formatTime(new Date(), 'YYYY-MM-DD'),
                      dExpirationDate: DEFAULT_EXPIRATION_DATE
                    })
                  })
                }}
              >
                增行
              </Button>
            )}
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() =>
                setTableData((draft) => {
                  draft.splice(params.node.rowIndex!, 1)
                })
              }
            >
              删行
            </Button>
          </Space>
        )
      }
    ],
    [
      childInventoryCandidates,
      departmentCandidates,
      message,
      parentQuantity,
      setTableData,
      tableData,
      warehouseCandidates
    ]
  )

  const onFinish: FormProps<BOMAddDto>['onFinish'] = (values) => {
    if (tableData.some((i) => !i.iBaseQty || !i.iBasicQty)) {
      message.warning('子件基础用量和基本用量必填且大于0')
      return
    }
    addMutation.mutate(
      {
        ...values,
        Bodys: tableData.map((i) => ({
          ...i,
          iUseQty: i.iBaseQty! / (i.iBasicQty! * values.nQuantity)
        }))
      },
      {
        onSuccess: () => {
          setOpen?.(false)
          form.resetFields()
        }
      }
    )
  }

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
          initialValues={{
            dVersionDate: dayjs(new Date()),
            dEffectiveDate: dayjs(new Date())
          }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cBOMType"
                label="BOM 类型"
              >
                <Select
                  options={bomCandidates}
                  fieldNames={Dicts.dictSelectFieldNames}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cInvCode"
                label="母件编码"
                rules={[{ required: true }]}
              >
                <Select
                  options={parentInventoryCandidates}
                  fieldNames={{
                    label: 'cInvCode',
                    value: 'cInvCode'
                  }}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                    (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onSelect={(_value, option) => {
                    form.setFieldsValue({
                      cInvName: option.cInvName,
                      cInvstd: option.cInvstd,
                      cUnitCode: option.cSaleUnitCode,
                      cUnitName: option.cSaleUnitName
                    })
                  }}
                  optionRender={(option) => (
                    <Flex justify="space-between">
                      <span>{option.data.cInvCode}</span>
                      <span> {option.data.cInvName}</span>
                    </Flex>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cInvName"
                label="母件名称"
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cEnglishName"
                label="英文名称"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cInvstd"
                label="规格型号"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="cUnitName"
                label="计量单位"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<BOMVo>
                name="nQuantity"
                label="母件数量"
                rules={[{ required: true }]}
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
                draft.push({
                  iRowNumber: `${draft.length === 0 ? 10 : +draft.at(-1)!.iRowNumber! + 10}`,
                  iProcessNumber: DEFAULT_PROCESS_NUMBER,
                  iBasicQty: 100,
                  iBaseQty: 1,
                  iUseQty: 1,
                  iLossRate: 0,
                  iFixedQty: 0,
                  cSupplyType: '1',
                  dEffectiveDate: DateUtils.formatTime(new Date(), 'YYYY-MM-DD'),
                  dExpirationDate: DEFAULT_EXPIRATION_DATE
                })
              })
            }
          >
            增行
          </Button>
        </Space>

        <div className="ag-theme-quartz h-[500px]">
          <AgGridReact<BOMChildItemVo>
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={tableData}
            editType="fullRow"
          />
        </div>
      </Space>
    </Modal>
  )
}
