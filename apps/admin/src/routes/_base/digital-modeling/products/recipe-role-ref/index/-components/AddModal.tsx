import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as BOM from '@/features/bom'
import { type RecipeRoleRefAddDto, useAddMutation } from '@/features/recipe-role-ref'
import * as Role from '@/features/roles'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<RecipeRoleRefAddDto>()

  const { data: { data: bomCandidates } = {} } = useQuery(
    BOM.listQO({
      ...defaultMaxPageDto
    })
  )
  const { data: { data: roleCandidates } = {} } = useQuery(
    Role.listQO({
      ...defaultMaxPageDto
    })
  )

  const addMutation = useAddMutation()

  const onFinish: FormProps<RecipeRoleRefAddDto>['onFinish'] = (values) =>
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
      title="新增配方角色对照"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="700px"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<RecipeRoleRefAddDto>
          name="cRoleCode"
          label="角色编码"
          rules={[{ required: true }]}
        >
          <Select
            options={roleCandidates}
            fieldNames={{
              label: 'cRoleCode',
              value: 'cRoleCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cRoleCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                (option?.cRoleName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            onSelect={(_value, option) => {
              form.setFieldsValue({
                cRoleName: option.cRoleName
              })
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cRoleName}</span>
                <span> {option.data.cRoleCode}</span>
              </Flex>
            )}
          />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="cRoleName"
          label="角色名称"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
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
              <Row>
                <Col span={8}>{option.data.cInvCode}</Col>
                <Col span={12}> {option.data.cInvName}</Col>
                <Col span={4}> {option.data.cVersion}</Col>
              </Row>
            )}
          />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="cInvName"
          label="产品名称"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="BomUID"
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="cInvstd"
          label="规格型号"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="iBOMStatus"
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="iBOMStatusName"
          label="BOM状态"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="cBOMType"
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="cBOMTypeName"
          label="BOM类别"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="cVersion"
          label="版本代号"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="dVersionDate"
          label="版本日期"
          getValueProps={(value) => ({ value: value && DateUtils.convertToDayjs(value) })}
          normalize={(value) => value && DateUtils.formatTime(value)}
        >
          <DatePicker
            placeholder=""
            disabled
          />
        </Form.Item>
        <Form.Item<RecipeRoleRefAddDto>
          name="cVerisionMemo"
          label="版本说明"
        >
          <Input.TextArea disabled />
        </Form.Item>
      </Form>
    </Modal>
  )
}
