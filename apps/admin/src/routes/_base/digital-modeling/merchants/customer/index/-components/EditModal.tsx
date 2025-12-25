import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { type CustomerEditDto, detailQO, useEditMutation } from '@/features/customer'
import { treeQO } from '@/features/customer-class'
import { listQO as departmentListQO } from '@/features/department'
import { listQO as employeeListQO } from '@/features/employee'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<CustomerEditDto>()

  const cDepName = Form.useWatch('cDepName', form)
  const cEmployeeName = Form.useWatch('cEmployeeName', form)

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))
  const { data: treeData } = useSuspenseQuery(treeQO())
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

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...detailData,
        dRegisterDate: DateUtils.convertToDayjs(detailData?.dRegisterDate),
        dDevelopmentDate: DateUtils.convertToDayjs(detailData?.dDevelopmentDate),
        dStopDate: DateUtils.convertToDayjs(detailData?.dStopDate)
      })
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<CustomerEditDto>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...detailData,
        ...values
      },
      {
        onSuccess: () => {
          setOpen?.(false)
        }
      }
    )

  return (
    <Modal
      title="编辑客户档案"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="60%"
    >
      <Form
        className="pt-3"
        name="edit-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Skeleton loading={isPending}>
          <Tabs
            items={[
              {
                label: '基本',
                key: 'basic',
                children: (
                  <Row>
                    <Col span={24}>
                      <Form.Item<CustomerEditDto>
                        name="cCustomerName"
                        label="客户名称"
                        rules={[{ required: true }]}
                        labelCol={{ span: 3 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item<CustomerEditDto>
                        name="cCustomerCode"
                        label="客户编码"
                        rules={[{ required: true }]}
                        labelCol={{ span: 3 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cCustomerClassCode"
                        label="所属分类"
                        rules={[{ required: true }]}
                      >
                        <TreeSelect
                          treeData={treeData}
                          fieldNames={{
                            value: 'cCustomerClassCode',
                            label: 'cCustomerClassName',
                            children: 'Child'
                          }}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cExch_Name"
                        label="币种"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cTaxID"
                        label="税号"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cLegalPerson"
                        label="法人"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cRegisterMoney"
                        label="注册资金"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
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
                      <Form.Item<CustomerEditDto>
                        name="cDepCode"
                        label="分管部门"
                      >
                        <Select
                          options={departmentData?.data}
                          fieldNames={{
                            label: 'cDepName',
                            value: 'cDepCode'
                          }}
                          showSearch
                          allowClear
                          onSearch={(value) => form.setFieldValue('cDepName', value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cManagerCode"
                        label="专业业务员"
                      >
                        <Select
                          options={employeeData?.data}
                          fieldNames={{
                            label: 'cEmployeeName',
                            value: 'cEmployeeCode'
                          }}
                          showSearch
                          allowClear
                          onSearch={(value) => form.setFieldValue('cEmployeeName', value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cPerson"
                        label="联系人"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cPhone"
                        label="手机"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
                        name="cEmail"
                        label="邮箱"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<CustomerEditDto>
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
                      <Form.Item<CustomerEditDto>
                        name="IsCreditLimit"
                        label="控制信用额度"
                        valuePropName="checked"
                        labelCol={{ span: 20 }}
                      >
                        <Checkbox />
                      </Form.Item>
                    </Col>
                    <Col span={20}>
                      <Form.Item<CustomerEditDto>
                        name="cCreditLimit"
                        label="信用额度"
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item<CustomerEditDto>
                        name="IsCreditTerm"
                        label="控制信用期限"
                        valuePropName="checked"
                        labelCol={{ span: 20 }}
                      >
                        <Checkbox />
                      </Form.Item>
                    </Col>
                    <Col span={20}>
                      <Form.Item<CustomerEditDto>
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
                      <Form.Item<CustomerEditDto>
                        name="dDevelopmentDate"
                        label="发展日期"
                      >
                        <DatePicker />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item<CustomerEditDto>
                        name="dStopDate"
                        label="停止日期"
                      >
                        <DatePicker />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item<CustomerEditDto>
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
        </Skeleton>
      </Form>
    </Modal>
  )
}
