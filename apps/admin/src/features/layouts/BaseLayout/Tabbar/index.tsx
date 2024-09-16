import { theme } from 'antd'

export default function Tabbar() {
  const { headerBg } = theme.useToken().token.Layout!

  const navigate = useNavigate()

  const tabbarStore = useTabbarStore()

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
    }
  }

  const onTabClick = (key: string) => navigate({ to: key })

  return (
    <div
      className="sticky top-14 z-50 h-10 w-full border-b border-gray-300 bg-white px-1 pt-1 shadow-sm dark:border-gray-950"
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
