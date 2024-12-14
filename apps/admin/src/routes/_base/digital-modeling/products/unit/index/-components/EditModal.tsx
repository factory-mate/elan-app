import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  detailQO,
  type UnitEditDto,
  useEditMutation
} from '@/features/digital-modeling/products/unit'
import {
  fullListQO,
  unitClassSelectFieldNames
} from '@/features/digital-modeling/products/unit-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<UnitEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))
  const { data: options } = useSuspenseQuery(fullListQO())

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<UnitEditDto>['onFinish'] = (values) =>
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
      title="编辑计量单位档案"
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
          <Form.Item<UnitEditDto>
            name="cUnitClassCode"
            label="所属计量单位组"
            rules={[{ required: true }]}
          >
            <Select
              options={options}
              fieldNames={unitClassSelectFieldNames}
            />
          </Form.Item>
          <Form.Item<UnitEditDto>
            name="cUnitName"
            label="计量单位名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UnitEditDto>
            name="cUnitCode"
            label="计量单位编码"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UnitEditDto>
            name="iRate"
            label="换算率"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<UnitEditDto>
            name="bMainUnit"
            label="是否主计量"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
