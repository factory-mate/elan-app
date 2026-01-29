import type {
  ColProps,
  DatePickerProps,
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  SwitchProps,
  TimeRangePickerProps
} from 'antd'

export interface FilterAreaProps<T = any> {
  filterDefs?: FilterDef<T>[]
  form?: FormProps
  queryKey?: string
  shouldResetClear?: boolean
  filterData?: Record<string, any>
  setFilterData?: (data: Record<string, any>) => void
  onSearch?: () => void
  onReset?: () => void
}

export interface FilterDef<T = any> extends FormItemProps<T> {
  col?: ColProps
  type?:
    | 'input'
    | 'input-number'
    | 'select'
    | 'switch'
    | 'date-picker'
    | 'date-range-picker'
    | 'custom'
  inputProps?: InputProps
  inputNumberProps?: InputNumberProps
  selectProps?: SelectProps
  switchProps?: SwitchProps
  datePickerProps?: DatePickerProps
  rangePickerProps?: TimeRangePickerProps
  render?: () => React.ReactNode
}

export default function FilterArea<T>(props: FilterAreaProps<T>) {
  const {
    form,
    filterDefs,
    queryKey,
    shouldResetClear,
    onSearch,
    onReset,
    filterData,
    setFilterData
  } = props

  const location = useLocation()

  const filterCacheStore = useFilterCacheStore()

  const [expand, setExpand] = useState(false)

  const computedSearchColSpan = useMemo(() => {
    const activeFilterLength = filterDefs?.filter((f) => !f.hidden).length ?? 0
    if (activeFilterLength <= 3) {
      return 24 - (activeFilterLength % 3) * 8
    }
    return expand ? 24 - (activeFilterLength % 3) * 8 : 8
  }, [expand, filterDefs])

  useEffect(() => {
    form?.form?.setFieldsValue?.({ ...filterData })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form
      labelCol={{ span: 6 }}
      {...form}
      onFinish={(values) => {
        setFilterData?.({ ...values })
        form?.onFinish?.(values)
        filterCacheStore.setItem(location.pathname, { ...values })
      }}
    >
      <Card size="small">
        <Row>
          {filterDefs
            ?.filter((f) => !f.hidden)
            ?.map((def, index) => {
              const {
                col,
                type,
                render,
                inputProps,
                inputNumberProps,
                selectProps,
                switchProps,
                datePickerProps,
                rangePickerProps,
                ...formItem
              } = def
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
                          {...inputProps}
                        />
                      )}
                      {type === 'input-number' && (
                        <InputNumber
                          className="w-full"
                          {...inputNumberProps}
                        />
                      )}
                      {type === 'select' && (
                        <Select
                          allowClear
                          {...selectProps}
                        />
                      )}
                      {type === 'switch' && (
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          {...switchProps}
                        />
                      )}
                      {type === 'date-picker' && (
                        <DatePicker
                          className="w-full"
                          {...datePickerProps}
                        />
                      )}
                      {type === 'date-range-picker' && (
                        <DatePicker.RangePicker {...rangePickerProps} />
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
                    setFilterData?.({})
                    form?.form?.resetFields()
                    if (queryKey) {
                      queryClient.invalidateQueries({ queryKey: [queryKey] })
                      if (shouldResetClear) {
                        queryClient.resetQueries({ queryKey: [queryKey] })
                      }
                    }
                    filterCacheStore.removeItem(location.pathname)
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
