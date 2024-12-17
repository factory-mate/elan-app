import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type CodingSchemeAddDto,
  useAddMutation
} from '@/features/digital-modeling/basic-settings/coding-scheme'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<CodingSchemeAddDto>()

  const addMutation = useAddMutation()

  const onFinish: FormProps<CodingSchemeAddDto>['onFinish'] = (values) =>
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
      title="新增编码方案"
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
        labelCol={{ span: 9 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Row>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="cProgramTypeName"
              label="项目"
              labelCol={{ span: 9 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iMaxGrade"
              label="最大级数"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iMaxLength"
              label="最大长度"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iOneMaxLength"
              label="单级最大长度"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iFirstLength"
              label="第 1 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iSecondLength"
              label="第 2 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iThirdLength"
              label="第 3 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iFouthLength"
              label="第 4 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iFifthLength"
              label="第 5 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iSixthLength"
              label="第 6 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iSeventhLength"
              label="第 7 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iEighthLength"
              label="第 6 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iNinthLength"
              label="第 9 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iTenthLength"
              label="第 10 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iEleventhLength"
              label="第 11 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<CodingSchemeAddDto>
              name="iTwelfthLength"
              label="第 12 级"
              labelCol={{ span: 9 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
