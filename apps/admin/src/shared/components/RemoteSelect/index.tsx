import type { SelectProps } from 'antd'

interface RemoteSelectProps extends SelectProps {
  handler?: (currentValue: string, v: string, callback: (data: { value: string }[]) => void) => void
}

export default function RemoteSelect(props: RemoteSelectProps) {
  const { handler = () => {} } = props

  const [data, setData] = useState<SelectProps['options']>([])
  const [value, setValue] = useState<string>()

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentValue = useRef<string>('')

  const fetchData = useCallback(
    (v: string, callback: (data: { value: string }[]) => void) => {
      if (timeout.current) {
        clearTimeout(timeout.current)
        timeout.current = null
      }

      currentValue.current = v

      // if (v) {
      timeout.current = setTimeout(() => {
        currentValue.current = v
        handler(currentValue.current, v, callback)
      }, 300)
      // } else {
      //   callback([])
      // }
    },
    [handler]
  )

  const handleSearch = (newValue: string) => {
    fetchData(newValue, setData)
  }

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    fetchData('', setData)
  }, [fetchData])

  return (
    <Select
      options={data}
      showSearch={{
        filterOption: false,
        onSearch: handleSearch
      }}
      allowClear
      value={value}
      defaultActiveFirstOption={false}
      onChange={handleChange}
      notFoundContent={null}
      {...props}
    />
  )
}
