import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  detailQO,
  useEditMutation,
  type VendorEditDto
} from '@/features/digital-modeling/merchants/vendor'
import {
  treeQO,
  vendorClassTreeSelectFieldNames
} from '@/features/digital-modeling/merchants/vendor-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<VendorEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))
  const { data: treeData } = useSuspenseQuery(treeQO())

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<VendorEditDto>['onFinish'] = (values) => {
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
  }

  return (
    <Modal
      title="编辑供应商档案"
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
        name="edit-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          bProduct: false
        }}
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
                      <Form.Item<VendorEditDto>
                        name="cVendorName"
                        label="供应商名称"
                        rules={[{ required: true }]}
                        labelCol={{ span: 3 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item<VendorEditDto>
                        name="cVendorCode"
                        label="供应商编码"
                        rules={[{ required: true }]}
                        labelCol={{ span: 3 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cVendorClassCode"
                        label="所属分类"
                        rules={[{ required: true }]}
                      >
                        <TreeSelect
                          treeData={treeData}
                          fieldNames={vendorClassTreeSelectFieldNames}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cExch_Name"
                        label="币种"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cTaxID"
                        label="税号"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cLegalPerson"
                        label="法人"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cRegisterMoney"
                        label="注册资金"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
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
                      <Form.Item<VendorEditDto>
                        name="cDepCode"
                        label="分管部门"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cManagerCode"
                        label="专业业务员"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cPerson"
                        label="联系人"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cPhone"
                        label="手机"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
                        name="cEmail"
                        label="邮箱"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<VendorEditDto>
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
                      <Form.Item<VendorEditDto>
                        name="IsCreditLimit"
                        label="控制信用额度"
                        valuePropName="checked"
                        labelCol={{ span: 20 }}
                      >
                        <Checkbox />
                      </Form.Item>
                    </Col>
                    <Col span={20}>
                      <Form.Item<VendorEditDto>
                        name="cCreditLimit"
                        label="信用额度"
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item<VendorEditDto>
                        name="IsCreditTerm"
                        label="控制信用期限"
                        valuePropName="checked"
                        labelCol={{ span: 20 }}
                      >
                        <Checkbox />
                      </Form.Item>
                    </Col>
                    <Col span={20}>
                      <Form.Item<VendorEditDto>
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
                      <Form.Item<VendorEditDto>
                        name="dDevelopmentDate"
                        label="发展日期"
                      >
                        <DatePicker />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item<VendorEditDto>
                        name="dStopDate"
                        label="停止日期"
                      >
                        <DatePicker />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item<VendorEditDto>
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
