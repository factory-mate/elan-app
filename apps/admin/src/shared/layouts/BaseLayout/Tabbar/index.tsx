import { theme } from 'antd'

export default function Tabbar() {
  const { headerBg } = theme.useToken().token.Layout!

  const navigate = useNavigate()
  const location = useLocation()

  const tabbarStore = useTabbarStore()
  const filterCacheStore = useFilterCacheStore()

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'remove') {
      if (targetKey === tabbarStore.activeKey) {
        const index = tabbarStore.items.findIndex((i) => i.key === targetKey)
        const prevKey = tabbarStore.items[index - 1]?.key
        const nextKey = tabbarStore.items[index + 1]?.key
        navigate({ to: prevKey || nextKey || '/' })
      }
      tabbarStore.removeItem(targetKey as string)
      filterCacheStore.removeItem(location.pathname)
    }
  }

  const onTabClick = (key: string) => navigate({ to: key })

  return (
    <div
      className="h-9 w-full bg-white pt-1 shadow-sm"
      style={{ backgroundColor: headerBg }}
    >
      <Tabs
        type="editable-card"
        size="small"
        hideAdd
        animated
        tabBarGutter={4}
        items={tabbarStore.items}
        activeKey={tabbarStore.activeKey}
        onEdit={onEdit}
        onTabClick={onTabClick}
      />
    </div>
  )
}
