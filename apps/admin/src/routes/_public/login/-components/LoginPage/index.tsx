import { type LoginFormValues, useLoginMutation } from '@/features/auth'

import Banner from './Banner'
import Logo from './Logo'

export default function LoginPage() {
  const [form] = Form.useForm<LoginFormValues>()

  const loginMutation = useLoginMutation()

  useEffect(() => {
    try {
      const rememberedAccount = JSON.parse(AuthUtils.getRememberedAccount() ?? '')
      if (rememberedAccount) {
        form.setFieldsValue({ ...rememberedAccount, remember: true })
      }
    } catch {
      //
    }
  }, [form])

  return (
    <Flex className="m-4 h-[500px] w-[900px] select-none overflow-hidden rounded-lg bg-white shadow-sm">
      <Banner />
      <Flex
        className="w-full sm:w-1/2"
        vertical
        align="center"
        justify="center"
        gap={40}
      >
        <Logo />

        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 8,
                verticalLabelPadding: '0 0 2px'
              }
            }
          }}
        >
          <Form
            className="w-[350px]"
            layout="vertical"
            form={form}
            onFinish={loginMutation.mutate}
          >
            <Form.Item
              name="cLoginName"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                placeholder="请输入用户名"
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="cPassWord"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="请输入密码"
                autoComplete="password"
              />
            </Form.Item>

            <Form.Item>
              <Flex
                justify="space-between"
                align="center"
              >
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  noStyle
                >
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Flex>
    </Flex>
  )
}
