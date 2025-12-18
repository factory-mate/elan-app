import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as BOM from '@/features/bom'
import * as Employee from '@/features/employee'
import { type RecipeEmployeeRefAddDto, useAddMutation } from '@/features/recipe-employee-ref'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<RecipeEmployeeRefAddDto>()

  const { data: { data: bomCandidates } = {} } = useQuery(
    BOM.listQO({
      ...defaultMaxPageDto
    })
  )
  const { data: { data: employeeCandidates } = {} } = useQuery(
    Employee.listQO({
      ...defaultMaxPageDto
    })
  )

  const addMutation = useAddMutation()

  const onFinish: FormProps<RecipeEmployeeRefAddDto>['onFinish'] = (values) =>
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
      title="新增配方职员对照"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="400px"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cEmployeeCode"
          label="职员编码"
          rules={[{ required: true }]}
        >
          <Select
            options={employeeCandidates}
            fieldNames={{
              label: 'cEmployeeCode',
              value: 'cEmployeeCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cEmployeeCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                (option?.cEmployeeName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            onSelect={(_value, option) => {
              form.setFieldsValue({
                cEmployeeName: option.cEmployeeName
              })
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cEmployeeName}</span>
                <span> {option.data.cEmployeeCode}</span>
              </Flex>
            )}
          />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cEmployeeName"
          label="职员名称"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cInvCode"
          label="产品编码"
          rules={[{ required: true }]}
        >
          <Select
            options={bomCandidates}
            fieldNames={{
              label: 'cInvCode',
              value: 'cInvCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            onSelect={(_value, option) => {
              form.setFieldsValue({
                BomUID: option.UID,
                cInvName: option.cInvName,
                cInvstd: option.cInvstd,
                iBOMStatus: option.iStatus,
                iBOMStatusName: option.iStatusName,
                cBOMType: option.cBOMType,
                cBOMTypeName: option.cBOMTypeName,
                cVersion: option.cVersion,
                dVersionDate: option.dVersionDate,
                cVerisionMemo: option.cVerisionMemo
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
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cInvName"
          label="产品名称"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="BomUID"
          hidden
        />
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cInvstd"
          label="规格型号"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="iBOMStatus"
          hidden
        />
        <Form.Item<RecipeEmployeeRefAddDto>
          name="iBOMStatusName"
          label="BOM状态"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cBOMType"
          hidden
        />
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cBOMTypeName"
          label="BOM类别"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cVersion"
          label="版本代号"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="dVersionDate"
          label="版本日期"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeEmployeeRefAddDto>
          name="cVerisionMemo"
          label="版本说明"
        >
          <Input.TextArea disabled />
        </Form.Item>
      </Form>
    </Modal>
  )
}
