import { type MenuProps, theme } from 'antd'

import { filterMenuTree, staticMenus } from '@/features/menus'

export default function SideMenu() {
  const { siderBg } = theme.useToken().token.Layout!
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  useEffect(() => {
    const keys =
      location.pathname === '/'
        ? ['/']
        : location.pathname
            .split('/')
            .filter((i) => i)
            .map((i) => `/${i}`)
    setSelectedKeys(keys)
    // setOpenKeys((value) => keys.concat(value))
  }, [location.pathname])

  const handleClickMenuItem: MenuProps['onClick'] = (menuItem) => {
    if (menuItem?.key && typeof menuItem.key === 'string') {
      navigate({ to: menuItem.keyPath.toReversed().join('') })
    }
  }

  return (
    <Menu
      className="select-none"
      style={{
        backgroundColor: siderBg,
        border: 'none',
        height: 'calc(100vh - 98px)',
        width: '100%',
        overflowY: 'auto'
      }}
      items={filterMenuTree(staticMenus) as MenuProps['items']}
      mode="vertical"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      onClick={handleClickMenuItem}
    />
  )
}
