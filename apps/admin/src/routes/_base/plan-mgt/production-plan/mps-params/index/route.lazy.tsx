import { createLazyFileRoute } from '@tanstack/react-router'
import type { FormProps } from 'antd'

import { fullListQO, type MpsParamsEditDto, useEditMutation } from '@/features/mps-params'

export const Route = createLazyFileRoute('/_base/plan-mgt/production-plan/mps-params/')({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm<MpsParamsEditDto>()

  const { data: listData } = useQuery(fullListQO())

  const editMutation = useEditMutation()

  const onFinish: FormProps<MpsParamsEditDto>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...listData?.[0],
        ...values
      },
      {
        onSettled: async () => {
          const data = await queryClient.fetchQuery(fullListQO())
          form.setFieldsValue(data?.[0])
        }
      }
    )

  useEffect(() => {
    form.setFieldsValue({ ...listData?.[0] })
  }, [listData, form])

  return (
    <PageContainer>
      <Card
        size="small"
        className="w-[360px]"
      >
        <Form
          className="pt-3"
          name="add-form"
          form={form}
          labelCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item<MpsParamsEditDto>
            name="bSalePrediction"
            label="是否考虑销售预测"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>
          <Form.Item<MpsParamsEditDto>
            name="bSaleOrder"
            label="是否考虑销售订单"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>
          <Form.Item<MpsParamsEditDto>
            name="bUnEndVouch"
            label="是否考虑未完工订单"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>
          <Form.Item<MpsParamsEditDto>
            name="bStock"
            label="是否考虑库存"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>
          <Form.Item<MpsParamsEditDto>
            name="bMerge"
            label="是否考虑合并订单"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>
          <PermCodeProvider code="mps-params:edit">
            <Button
              type="primary"
              htmlType="submit"
              className="float-right"
              disabled={editMutation.isPending}
              loading={editMutation.isPending}
            >
              提交
            </Button>
          </PermCodeProvider>
        </Form>
      </Card>
    </PageContainer>
  )
}
