import { type ChangePasswordFormValues, useChangePasswordMutation } from '@/features/users'

export const Route = createLazyFileRoute('/_base/change-password')({
  component: Page
})

function Page() {
  const [form] = Form.useForm<ChangePasswordFormValues>()

  const userStore = useUserStore()

  const changePasswordMutation = useChangePasswordMutation()

  useEffect(() => {
    form.setFieldsValue({ userName: userStore.userInfo?.UserName })
  }, [form, userStore.userInfo?.UserName])

  return (
    <Card className="w-[500px]">
      <Form
        layout="vertical"
        initialValues={{ userName: userStore.userInfo?.UserName }}
        form={form}
        onFinish={(values) =>
          changePasswordMutation.mutate(
            { ...values, UID: userStore.userInfo?.UserId },
            {
              onSuccess: () => {
                form.resetFields()
              }
            }
          )
        }
      >
        <Form.Item
          name="userName"
          label="用户名"
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          name="cPassWordOld"
          label="旧密码"
          rules={[{ required: true, message: '请输入旧密码' }]}
        >
          <Input.Password
            placeholder="请输入旧密码"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="cPassWordNew"
          label="新密码"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password
            placeholder="请输入新密码"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          rules={[
            { required: true, message: '请输入确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('cPassWordNew') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次输入的密码不一致'))
              }
            })
          ]}
        >
          <Input.Password
            placeholder="请输入确认密码"
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={changePasswordMutation.isPending}
            disabled={changePasswordMutation.isPending}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
