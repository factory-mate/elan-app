import type { FormInstance } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import type { FilterForm } from '../-types'

interface FilterAreaProps {
  form: FormInstance<FilterForm>
  setFilterData?: Dispatch<SetStateAction<FilterForm>>
}

export default function FilterArea(props: FilterAreaProps) {
  const { form, setFilterData } = props

  // const [expand, setExpand] = useState(false)

  return (
    <Card size="small">
      <Form<FilterForm>
        form={form}
        layout="horizontal"
        initialValues={{ isExpand: true }}
        labelCol={{ span: 7 }}
        onFinish={(values) => setFilterData?.({ ...values })}
      >
        <Row>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cInvCode"
              label="原料编码"
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cInvName"
              label="原料名称"
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Flex
              justify="end"
              align="center"
              gap={8}
            >
              <Tooltip title="搜索">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => queryClient.invalidateQueries()}
                >
                  <LucideSearch />
                </Button>
              </Tooltip>
              <Tooltip title="重置">
                <Button
                  htmlType="submit"
                  onClick={() => {
                    form.resetFields()
                    setFilterData?.({})
                    queryClient.invalidateQueries()
                  }}
                >
                  <LucideRefreshCcw />
                </Button>
              </Tooltip>

              {/* <Tooltip title={expand ? '折叠' : '展开'}>
                <Button onClick={() => setExpand(!expand)}>
                  <LucideChevronsDown
                    className={clsx('transition-all', expand ? 'rotate-180' : 'rotate-0')}
                  />
                </Button>
              </Tooltip> */}
            </Flex>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
