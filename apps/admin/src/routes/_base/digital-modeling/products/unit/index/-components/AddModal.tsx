import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { type UnitAddDto, useAddMutation } from '@/features/digital-modeling/products/unit'
import {
  fullListQO,
  unitClassSelectFieldNames
} from '@/features/digital-modeling/products/unit-class'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<UnitAddDto>()

  const { data } = useSuspenseQuery(fullListQO({}))

  const addMutation = useAddMutation()

  const onFinish: FormProps<UnitAddDto>['onFinish'] = (values) =>
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
      title="新增计量单位档案"
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
        <Form.Item<UnitAddDto>
          name="cUnitClassCode"
          label="所属计量单位组"
          rules={[{ required: true }]}
        >
          <Select
            options={data}
            fieldNames={unitClassSelectFieldNames}
          />
        </Form.Item>
        <Form.Item<UnitAddDto>
          name="cUnitName"
          label="计量单位名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UnitAddDto>
          name="cUnitCode"
          label="计量单位编码"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UnitAddDto>
          name="iRate"
          label="换算率"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<UnitAddDto>
          name="bMainUnit"
          label="是否主计量"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  )
}
