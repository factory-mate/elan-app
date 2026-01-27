import { type MenuProps, type SelectProps, theme } from 'antd'

import { type ExtendedMenuItemType, filterMenuTree, staticMenus } from '@/shared/menus'

export default function SideMenu() {
  const { siderBg } = theme.useToken().token.Layout!
  const navigate = useNavigate()
  const location = useLocation()

  const permStore = usePermStore()

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const menuItems = useMemo<MenuProps['items']>(
    () => filterMenuTree(staticMenus, permStore.codes, permStore.whiteList) as MenuProps['items'],
    [permStore.codes, permStore.whiteList]
  )

  const leafMenuItems = useMemo<SelectProps['options']>(() => {
    const leafItems: SelectProps['options'] = []
    const traverse = (items: ExtendedMenuItemType[], path: string[] = []) => {
      items?.forEach((item) => {
        const currentPath = [...path, item.key?.toString() || '']
        if (item.children && item.children.length > 0) {
          traverse(item.children, currentPath)
        } else {
          leafItems.push({
            label: item.label,
            value: currentPath.join('')
          })
        }
      })
    }
    traverse(menuItems as ExtendedMenuItemType[])
    return leafItems
  }, [menuItems])

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
    <Flex
      className="h-[calc(100vh-80px)] w-full"
      vertical
    >
      <div className="h-10 p-1">
        <Select
          rootClassName="w-full"
          options={leafMenuItems}
          placeholder="请输入菜单名称"
          allowClear
          showSearch={{
            filterOption: (inputValue, option) => {
              if (!inputValue) {
                return false
              }
              return !!option!.label?.toString().includes(inputValue)
            }
          }}
          prefix={<LucideSearch />}
          onSelect={(value) => navigate({ to: value })}
        />
      </div>

      <Menu
        className="select-none"
        style={{
          backgroundColor: siderBg,
          border: 'none',
          width: '100%',
          overflowY: 'auto',
          flex: 1
        }}
        items={menuItems}
        mode="vertical"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        onClick={handleClickMenuItem}
      />
    </Flex>
  )
}
