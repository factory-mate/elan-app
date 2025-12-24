import { listQO } from '../../queries'

interface ProductNameRemoteSelectProps extends RemoteSelectProps {}

export default function ProductNameRemoteSelect(props: ProductNameRemoteSelectProps) {
  const queryClient = useQueryClient()
  return (
    <RemoteSelect
      styles={{
        popup: {
          root: {
            width: 500
          }
        }
      }}
      optionRender={(option) => (
        <Flex justify="space-between">
          <span>{option.data.label}</span>
          <span>{option.data.value}</span>
        </Flex>
      )}
      labelRender={(v) => v.value}
      fetchOptions={(search) =>
        queryClient
          .fetchQuery(
            listQO({
              ...defaultMinPageDto,
              conditions: queryBuilder([
                { key: 'IsProduct', type: 'eq', val: true },
                { key: 'cInvName', type: 'like', val: search }
              ])
            })
          )
          .then((res) =>
            res.data.map((i) => ({
              label: i.cInvCode,
              value: i.cInvName,
              data: i,
              key: i.cInvCode
            }))
          )
      }
      {...props}
    />
  )
}
