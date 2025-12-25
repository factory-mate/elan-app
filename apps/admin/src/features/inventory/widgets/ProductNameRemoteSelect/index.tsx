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
          <span>{option.data.cInvCode}</span>
          <span>{option.data.cInvName}</span>
        </Flex>
      )}
      fieldNames={{
        label: 'cInvCode',
        value: 'cInvName'
      }}
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
              ...i,
              key: i.cInvCode
            }))
          )
      }
      {...props}
    />
  )
}
