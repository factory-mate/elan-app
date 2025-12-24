import type { ColProps, FormItemProps, FormProps, InputProps, SelectProps } from 'antd'

export interface FilterAreaProps<T = any> {
  filterDefs?: FilterDef<T>[]
  form?: FormProps
  queryKey?: string
  onSearch?: () => void
  onReset?: () => void
}

export interface FilterDef<T = any> extends FormItemProps<T> {
  col?: ColProps
  type?: 'input' | 'select' | 'custom'
  input?: InputProps
  select?: SelectProps
  render?: () => React.ReactNode
}

export default function FilterArea<T>(props: FilterAreaProps<T>) {
  const { form, filterDefs, queryKey, onSearch, onReset } = props

  const [expand, setExpand] = useState(false)

  const computedSearchColSpan = useMemo(() => {
    const activeFilterLength = filterDefs?.filter((f) => !f.hidden).length ?? 0
    if (activeFilterLength <= 3) {
      return 24 - (activeFilterLength % 3) * 8
    }
    return expand ? 24 - (activeFilterLength % 3) * 8 : 8
  }, [expand, filterDefs])

  return (
    <Form
      className="pt-3"
      name="modal-filter-form"
      labelCol={{ span: 6 }}
      {...form}
    >
      <Card size="small">
        <Row>
          {filterDefs
            ?.filter((f) => !f.hidden)
            ?.map((def, index) => {
              const { col, type, render, input, select, ...formItem } = def
              const activeFilterLength = filterDefs?.filter((f) => !f.hidden).length ?? 0
              if (activeFilterLength > 3 && !expand && index > 1) {
                return null
              }
              return (
                <Fragment key={index}>
                  <Col
                    span={8}
                    {...col}
                  >
                    <Form.Item {...formItem}>
                      {type === 'input' && (
                        <Input
                          allowClear
                          {...input}
                        />
                      )}
                      {type === 'select' && (
                        <Select
                          allowClear
                          {...select}
                        />
                      )}
                      {type === 'custom' && render?.()}
                    </Form.Item>
                  </Col>
                </Fragment>
              )
            })}
          <Col span={computedSearchColSpan}>
            <Flex
              justify="end"
              align="center"
              gap={8}
            >
              <Tooltip title="搜索">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    if (queryKey) {
                      queryClient.invalidateQueries({ queryKey: [queryKey] })
                    }
                    onSearch?.()
                  }}
                >
                  <LucideSearch />
                </Button>
              </Tooltip>
              <Tooltip title="重置">
                <Button
                  htmlType="submit"
                  onClick={() => {
                    form?.form?.resetFields()
                    if (queryKey) {
                      queryClient.invalidateQueries({ queryKey: [queryKey] })
                    }
                    onReset?.()
                  }}
                >
                  <LucideRefreshCcw />
                </Button>
              </Tooltip>
              {(filterDefs?.filter((f) => !f.hidden) ?? []).length > 3 && (
                <Tooltip title={expand ? '折叠' : '展开'}>
                  <Button onClick={() => setExpand(!expand)}>
                    <LucideChevronsDown
                      className={clsx('transition-all', expand ? 'rotate-180' : 'rotate-0')}
                    />
                  </Button>
                </Tooltip>
              )}
            </Flex>
          </Col>
        </Row>
      </Card>
    </Form>
  )
}
