import type { MenuProps } from 'antd'

type ExtendedMenuItemType = NonNullable<MenuProps['items']>[number] & {
  permCode?: PermCode | PermCode[]
  children?: ExtendedMenuItemType[]
}

export const staticMenus: ExtendedMenuItemType[] = [
  { label: '仪表盘', key: '/' },
  {
    label: '数字化建模',
    key: '/digital-modeling',
    permCode: 'digital-modeling',
    children: [
      {
        label: '基本设置',
        key: '/basic-settings',
        permCode: 'basic-settings',
        children: [{ label: '编码方案', key: '/coding-scheme', permCode: 'coding-scheme' }]
      },
      {
        label: '组织架构',
        key: '/orgs',
        permCode: 'orgs',
        children: [
          // { label: '公司档案', key: '/company' },
          { label: '部门档案', key: '/department', permCode: 'department' },
          { label: '职员档案', key: '/employee', permCode: 'employee' }
          // { label: '工厂档案', key: '/factory' },
          // { label: '车间档案', key: '/workshop' }
        ]
      },
      {
        label: '产品建模',
        key: '/products',
        permCode: 'products',
        children: [
          { label: '计量单位组档案', key: '/unit-class', permCode: 'unit-class' },
          { label: '计量单位档案', key: '/unit', permCode: 'unit' },
          { label: '料品分类', key: '/inventory-class', permCode: 'inventory-class' },
          { label: '料品档案', key: '/inventory', permCode: 'inventory' },
          { label: '物料清单/配方', key: '/bom', permCode: 'bom' },
          { label: 'BOM Cost 报表', key: '/bom-cost', permCode: 'bom-cost' }
          // { label: '工序档案', key: '/process' },
          // { label: '工艺路线档案', key: '/process-route' }
        ]
      },
      {
        label: '客商信息',
        key: '/merchants',
        permCode: 'merchants',
        children: [
          { label: '客户分类', key: '/customer-class', permCode: 'customer-class' },
          { label: '客户档案', key: '/customer', permCode: 'customer' },
          { label: '供应商分类', key: '/vendor-class', permCode: 'vendor-class' },
          { label: '供应商档案', key: '/vendor', permCode: 'vendor' }
        ]
      }
    ]
  },
  {
    label: '生产计划',
    key: '/production-plan',
    permCode: 'production-plan',
    children: [
      { label: '销售订单', key: '/sales-order', permCode: 'sales-order' },
      { label: '生产订单', key: '/production-order', permCode: 'production-order' }
    ]
  },
  {
    label: '权限管理',
    key: '/perm-management',
    permCode: 'perm-management',
    children: [{ label: '角色管理', key: '/roles', permCode: 'roles' }]
  }
]

// export const filterPermMenus = (menus: ExtendedMenuItemType[]): MenuProps['items'] => {
//   // 递归过滤权限菜单
//   const filter = (menus: ExtendedMenuItemType[]): ExtendedMenuItemType[] =>
//     menus.filter((menu) => {
//       if (menu.permCode) {
//         // 如果有权限码，判断是否有权限
//         return true
//       }
//       if (menu.children) {
//         // 如果有子菜单，递归过滤
//         menu.children = filter(menu.children)
//         return menu.children.length > 0
//       }
//       return true
//     })
// }
