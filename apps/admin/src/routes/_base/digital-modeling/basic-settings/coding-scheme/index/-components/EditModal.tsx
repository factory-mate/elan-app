import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type CodingSchemeEditDto,
  detailQO,
  useEditMutation
} from '@/features/digital-modeling/basic-settings/coding-scheme'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<CodingSchemeEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<CodingSchemeEditDto>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...detailData,
        ...values
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )

  return (
    <Modal
      title="编辑编码方案"
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
          <Row>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="cProgramTypeName"
                label="项目"
                labelCol={{ span: 9 }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iMaxGrade"
                label="最大级数"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iMaxLength"
                label="最大长度"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iOneMaxLength"
                label="单级最大长度"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iFirstLength"
                label="第 1 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iSecondLength"
                label="第 2 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iThirdLength"
                label="第 3 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iFouthLength"
                label="第 4 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iFifthLength"
                label="第 5 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iSixthLength"
                label="第 6 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iSeventhLength"
                label="第 7 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iEighthLength"
                label="第 6 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iNinthLength"
                label="第 9 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iTenthLength"
                label="第 10 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iEleventhLength"
                label="第 11 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<CodingSchemeEditDto>
                name="iTwelfthLength"
                label="第 12 级"
                labelCol={{ span: 9 }}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Skeleton>
      </Form>
    </Modal>
  )
}
