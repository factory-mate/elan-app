import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { dictSelectFieldNames, fullListQO } from '@/features/dicts'
import {
  type InventoryAddDto,
  useAddMutation
} from '@/features/digital-modeling/products/inventory'
import * as InventoryClass from '@/features/digital-modeling/products/inventory-class'
import * as Unit from '@/features/digital-modeling/products/unit'
import * as UnitClass from '@/features/digital-modeling/products/unit-class'
import { onlyCanSelectTreeLeafNode } from '@/shared/antd'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<InventoryAddDto>()

  const cUnitClassCode = Form.useWatch(['info', 'cUnitClassCode'], form)

  const { data: periodUnitCandidates } = useSuspenseQuery(fullListQO('PeriodUnitType'))
  const { data: inventoryClassCandidates } = useQuery(InventoryClass.treeQO())
  const { data: unitClassCandidates } = useQuery(UnitClass.fullListQO({}))
  const { data: unitCandidates } = useQuery(
    Unit.fullListQO({
      conditions: cUnitClassCode ? `cUnitClassCode = ${cUnitClassCode}` : undefined
    })
  )

  const addMutation = useAddMutation()

  const onFinish: FormProps<InventoryAddDto>['onFinish'] = (values) =>
    addMutation.mutate(
      {
        ...values
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
      title="新增料品档案"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="60%"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Tabs
          items={[
            {
              label: '基本',
              key: 'basic',
              children: (
                <Row>
                  <Col span={24}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cInvCode']}
                      label="料品编码"
                      rules={[{ required: true }]}
                      labelCol={{ span: 3 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cInvName']}
                      label="料品名称"
                      rules={[{ required: true }]}
                      labelCol={{ span: 3 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cInvstd']}
                      label="规格型号"
                      rules={[{ required: true }]}
                      labelCol={{ span: 3 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cInvClassCode']}
                      label="所属分类"
                      rules={[{ required: true }]}
                    >
                      <TreeSelect
                        treeData={onlyCanSelectTreeLeafNode(inventoryClassCandidates ?? [])}
                        fieldNames={InventoryClass.inventoryClassTreeSelectFieldNames}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cUnitClassCode']}
                      label="计量单位组"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={unitClassCandidates}
                        fieldNames={UnitClass.unitClassSelectFieldNames}
                        onSelect={async (value) => {
                          const mainUnit = await queryClient.ensureQueryData(
                            Unit.fullListQO({
                              conditions: `cUnitClassCode = ${value} && bMainUnit = true`
                            })
                          )
                          if (mainUnit.length > 0) {
                            const unitCode = mainUnit[0].cUnitCode
                            form.setFields([
                              { name: ['info', 'cBuyUnitCode'], value: unitCode },
                              { name: ['info', 'cSaleUnitCode'], value: unitCode },
                              { name: ['info', 'cStoreUnitCode'], value: unitCode },
                              { name: ['info', 'cProductUnitCode'], value: unitCode }
                            ])
                          } else {
                            form.setFields([
                              { name: ['info', 'cBuyUnitCode'], value: undefined },
                              { name: ['info', 'cSaleUnitCode'], value: undefined },
                              { name: ['info', 'cStoreUnitCode'], value: undefined },
                              { name: ['info', 'cProductUnitCode'], value: undefined }
                            ])
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cBuyUnitCode']}
                      label="采购计量单位"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={unitCandidates}
                        fieldNames={Unit.unitSelectFieldNames}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cSaleUnitCode']}
                      label="销售计量单位"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={unitCandidates}
                        fieldNames={Unit.unitSelectFieldNames}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cStoreUnitCode']}
                      label="库存计量单位"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={unitCandidates}
                        fieldNames={Unit.unitSelectFieldNames}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['info', 'cProductUnitCode']}
                      label="生产计量单位"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={unitCandidates}
                        fieldNames={Unit.unitSelectFieldNames}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )
            },
            {
              label: '控制',
              key: 'control',
              children: (
                <Row>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsBatch']}
                      label="是否批次管理"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsPeriod']}
                      label="是否保质期管理"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'cPeriodUnitType']}
                      label="保质期单位"
                      labelCol={{ span: 12 }}
                    >
                      <Select
                        options={periodUnitCandidates}
                        fieldNames={dictSelectFieldNames}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'iPeriodValue']}
                      label="保质期周期"
                      labelCol={{ span: 12 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsBuy']}
                      label="采购"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsProduct']}
                      label="自制"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsSale']}
                      label="销售"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsMaterial']}
                      label="生产耗用"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsTax']}
                      label="应税劳务"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsDiscount']}
                      label="折扣"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsPart']}
                      label="备件"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsOutsourcing']}
                      label="委外"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsModel']}
                      label="模型"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsATO']}
                      label="ATO"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsPTO']}
                      label="PTO"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsEquipment']}
                      label="资产设备"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item<InventoryAddDto>
                      name={['control', 'IsSelect']}
                      label="选项类"
                      valuePropName="checked"
                      labelCol={{ span: 12 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                </Row>
              )
            },
            {
              label: '质量',
              key: 'qc',
              children: (
                <Row>
                  <Col span={24}>
                    <Form.Item<InventoryAddDto>
                      name={['qc', 'IsQC']}
                      label="是否检验"
                      valuePropName="checked"
                      labelCol={{ span: 3 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['qc', 'cQCType']}
                      label="检验方式"
                    >
                      <Select />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['qc', 'cQCRuleType']}
                      label="抽检规则"
                    >
                      <Select />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['qc', 'cQCUnitCode']}
                      label="检验计量单位"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['qc', 'iQCRate']}
                      label="抽检比例"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['qc', 'iQCQuantity']}
                      label="抽检定量"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['qc', 'cQCProject']}
                      label="检验方案"
                    >
                      <Select />
                    </Form.Item>
                  </Col>
                </Row>
              )
            },
            {
              label: '成本',
              key: 'cost',
              children: (
                <Row>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['cost', 'iStandardCost']}
                      label="标准成本"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['cost', 'iReferenceCost']}
                      label="参考成本"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['cost', 'iNewestCost']}
                      label="最新成本"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<InventoryAddDto>
                      name={['cost', 'iReferencePrice']}
                      label="参考售价"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              )
            }
          ]}
        />
      </Form>
    </Modal>
  )
}
