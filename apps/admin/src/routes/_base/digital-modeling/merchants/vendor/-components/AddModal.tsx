import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { useAddMutation, type VendorAddDto } from '@/features/digital-modeling/merchants/vendor'
import {
  treeQO,
  vendorClassTreeSelectFieldNames
} from '@/features/digital-modeling/merchants/vendor-class'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<VendorAddDto>()

  const { data } = useSuspenseQuery(treeQO())

  const addMutation = useAddMutation()

  const onFinish: FormProps<VendorAddDto>['onFinish'] = (values) => {
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
  }

  return (
    <Modal
      title="新增供应商档案"
      open={open}
      onOk={() => {
        setOpen?.(true)
        form.submit()
      }}
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
                    <Form.Item<VendorAddDto>
                      name="cVendorName"
                      label="供应商名称"
                      rules={[{ required: true }]}
                      labelCol={{ span: 3 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<VendorAddDto>
                      name="cVendorCode"
                      label="供应商编码"
                      rules={[{ required: true }]}
                      labelCol={{ span: 3 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cVendorClassCode"
                      label="所属分类"
                      rules={[{ required: true }]}
                    >
                      <TreeSelect
                        treeData={data}
                        fieldNames={vendorClassTreeSelectFieldNames}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cExch_Name"
                      label="币种"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cTaxID"
                      label="税号"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cLegalPerson"
                      label="法人"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cRegisterMoney"
                      label="注册资金"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="dRegisterDate"
                      label="成立日期"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                </Row>
              )
            },
            {
              label: '联系',
              key: 'contact',
              children: (
                <Row>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cDepCode"
                      label="分管部门"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cManagerCode"
                      label="专业业务员"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cPerson"
                      label="联系人"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cPhone"
                      label="手机"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cEmail"
                      label="邮箱"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<VendorAddDto>
                      name="cAddress"
                      label="地址"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              )
            },
            {
              label: '信用',
              key: 'credit',
              children: (
                <Row>
                  <Col span={4}>
                    <Form.Item<VendorAddDto>
                      name="IsCreditLimit"
                      label="控制信用额度"
                      valuePropName="checked"
                      labelCol={{ span: 20 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item<VendorAddDto>
                      name="cCreditLimit"
                      label="信用额度"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item<VendorAddDto>
                      name="IsCreditTerm"
                      label="控制信用期限"
                      valuePropName="checked"
                      labelCol={{ span: 20 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item<VendorAddDto>
                      name="cCreditTerm"
                      label="信用期限"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              )
            },
            {
              label: '其他',
              key: 'others',
              children: (
                <Row>
                  <Col span={24}>
                    <Form.Item<VendorAddDto>
                      name="dDevelopmentDate"
                      label="发展日期"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<VendorAddDto>
                      name="dStopDate"
                      label="停止日期"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<VendorAddDto>
                      name="cMemo"
                      label="备注"
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                </Row>
              )
            },
            { label: '扩展属性', key: 'extra', children: <div>暂无内容</div> }
          ]}
        />
      </Form>
    </Modal>
  )
}
