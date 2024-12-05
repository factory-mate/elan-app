import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { type CustomerAddDto, useAddMutation } from '@/features/digital-modeling/merchants/customer'
import {
  customerClassTreeSelectFieldNames,
  treeQO
} from '@/features/digital-modeling/merchants/customer-class'
import {
  departmentSelectFieldNames,
  listQO as departmentListQO
} from '@/features/digital-modeling/orgs/department'
import {
  employeeSelectFieldNames,
  listQO as employeeListQO
} from '@/features/digital-modeling/orgs/employee'
import { defaultPageDto } from '@/features/pagination'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<CustomerAddDto>()

  const cDepName = Form.useWatch('cDepName', form)
  const cEmployeeName = Form.useWatch('cEmployeeName', form)

  const { data } = useSuspenseQuery(treeQO())
  const { data: departmentData } = useQuery(
    departmentListQO({
      ...defaultPageDto,
      conditions: cDepName ? `cDepName like ${cDepName}` : undefined
    })
  )
  const { data: employeeData } = useQuery(
    employeeListQO({
      ...defaultPageDto,
      conditions: cEmployeeName ? `cEmployeeName like ${cEmployeeName}` : undefined
    })
  )

  const addMutation = useAddMutation()

  const onFinish: FormProps<CustomerAddDto>['onFinish'] = (values) =>
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
      title="新增客户档案"
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
                    <Form.Item<CustomerAddDto>
                      name="cCustomerName"
                      label="客户名称"
                      rules={[{ required: true }]}
                      labelCol={{ span: 3 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<CustomerAddDto>
                      name="cCustomerCode"
                      label="客户编码"
                      rules={[{ required: true }]}
                      labelCol={{ span: 3 }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cCustomerClassCode"
                      label="所属分类"
                      rules={[{ required: true }]}
                    >
                      <TreeSelect
                        treeData={data}
                        fieldNames={customerClassTreeSelectFieldNames}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cExch_Name"
                      label="币种"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cTaxID"
                      label="税号"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cLegalPerson"
                      label="法人"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cRegisterMoney"
                      label="注册资金"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
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
                    <Form.Item<CustomerAddDto>
                      name="cDepCode"
                      label="分管部门"
                    >
                      <Select
                        options={departmentData?.data}
                        fieldNames={departmentSelectFieldNames}
                        showSearch
                        allowClear
                        onSearch={(value) => form.setFieldValue('cDepName', value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cManagerCode"
                      label="专业业务员"
                    >
                      <Select
                        options={employeeData?.data}
                        fieldNames={employeeSelectFieldNames}
                        showSearch
                        allowClear
                        onSearch={(value) => form.setFieldValue('cEmployeeName', value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cPerson"
                      label="联系人"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cPhone"
                      label="手机"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
                      name="cEmail"
                      label="邮箱"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<CustomerAddDto>
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
                    <Form.Item<CustomerAddDto>
                      name="IsCreditLimit"
                      label="控制信用额度"
                      valuePropName="checked"
                      labelCol={{ span: 20 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item<CustomerAddDto>
                      name="cCreditLimit"
                      label="信用额度"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item<CustomerAddDto>
                      name="IsCreditTerm"
                      label="控制信用期限"
                      valuePropName="checked"
                      labelCol={{ span: 20 }}
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={20}>
                    <Form.Item<CustomerAddDto>
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
                    <Form.Item<CustomerAddDto>
                      name="dDevelopmentDate"
                      label="发展日期"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<CustomerAddDto>
                      name="dStopDate"
                      label="停止日期"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<CustomerAddDto>
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
