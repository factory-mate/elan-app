import type { SelectProps } from 'antd'
import { debounce } from 'lodash-es'

export interface RemoteSelectProps extends Omit<SelectProps, 'children'> {
  debounceTimeout?: number
  fetchOptions?: (search: string) => Promise<SelectProps['options']>
}

export default function RemoteSelect(props: RemoteSelectProps) {
  const { debounceTimeout = 300, fetchOptions, showSearch, ...otherProps } = props

  const [options, setOptions] = useState<SelectProps['options']>([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (v: string) => {
      if (!fetchOptions) {
        return
      }

      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setIsFetching(true)

      fetchOptions((v ?? '').replaceAll(' ', '')).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return
        }
        setOptions(newOptions)
        setIsFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  useEffect(() => {
    debounceFetcher('')
  }, [debounceFetcher])

  return (
    <Select
      options={options}
      showSearch={{
        filterOption: false,
        onSearch: debounceFetcher,
        ...(typeof showSearch === 'boolean' ? {} : showSearch)
      }}
      allowClear
      notFoundContent={isFetching ? <Spin size="small" /> : '未找到数据'}
      {...otherProps}
    />
  )
}
