import { type MenuProps, theme } from 'antd'

import { menuAuthCodeMap, menusQO, staticMenus } from '@/features/menus'

interface MenuItem {
  label: string
  key: string
  children?: MenuItem[]
}

export default function SideMenu() {
  const { siderBg } = theme.useToken().token.Layout!
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const { data } = useSuspenseQuery(menusQO())

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

  const checkAuthMenus = useCallback(
    (menus: MenuItem[] = []): MenuProps['items'] => {
      const result: MenuProps['items'] = []
      // eslint-disable-next-line no-restricted-syntax
      for (const menu of menus) {
        const authKey = menuAuthCodeMap.get(menu.key)
        if (authKey && (data.some((i) => i.cMenuCode === authKey) || authKey === '*')) {
          result.push({
            key: menu.key,
            label: menu.label,
            children: checkAuthMenus(menu.children)
          })
        }
      }
      return result.length === 0 ? undefined : result
    },
    [data]
  )

  const menuItems = useMemo(() => checkAuthMenus(staticMenus as MenuItem[]), [checkAuthMenus])

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
      items={menuItems}
      mode="vertical"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      onClick={handleClickMenuItem}
    />
  )
}
