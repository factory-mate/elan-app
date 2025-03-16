import type { MenuProps } from 'antd'

import type { PermCode } from '../perm-management/perms'

type ExtendedMenuItemType = NonNullable<MenuProps['items']>[number] & {
  authKey: PermCode | PermCode[]
  children?: ExtendedMenuItemType[]
}

export const staticMenus: ExtendedMenuItemType[] = [
  { label: '仪表盘', key: '/', authKey: 'x:x:x' },
  {
    label: '数字化建模',
    key: '/digital-modeling',
    authKey: 'digital-modeling',
    children: [
      {
        label: '基本设置',
        key: '/basic-settings',
        authKey: 'basic-settings',
        children: [{ label: '编码方案', key: '/coding-scheme', authKey: 'coding-scheme' }]
      },
      {
        label: '组织架构',
        key: '/orgs',
        authKey: 'orgs',
        children: [
          // { label: '公司档案', key: '/company' },
          { label: '部门档案', key: '/department', authKey: 'department' },
          { label: '职员档案', key: '/employee', authKey: 'employee' }
          // { label: '工厂档案', key: '/factory' },
          // { label: '车间档案', key: '/workshop' }
        ]
      },
      {
        label: '产品建模',
        key: '/products',
        authKey: 'products',
        children: [
          { label: '计量单位组档案', key: '/unit-class', authKey: 'unit-class' },
          { label: '计量单位档案', key: '/unit', authKey: 'unit' },
          { label: '料品分类', key: '/inventory-class', authKey: 'inventory-class' },
          { label: '料品档案', key: '/inventory', authKey: 'inventory' },
          { label: '物料清单/配方', key: '/bom', authKey: 'bom' },
          { label: 'BOM Cost 报表', key: '/bom-cost', authKey: 'bom-cost' }
          // { label: '工序档案', key: '/process' },
          // { label: '工艺路线档案', key: '/process-route' }
        ]
      },
      {
        label: '客商信息',
        key: '/merchants',
        authKey: 'merchants',
        children: [
          { label: '客户分类', key: '/customer-class', authKey: 'customer-class' },
          { label: '客户档案', key: '/customer', authKey: 'customer' },
          { label: '供应商分类', key: '/vendor-class', authKey: 'vendor-class' },
          { label: '供应商档案', key: '/vendor', authKey: 'vendor' }
        ]
      }
    ]
  },
  {
    label: '生产计划',
    key: '/production-plan',
    authKey: 'production-plan',
    children: [
      { label: '销售订单', key: '/sales-order', authKey: 'sales-order' },
      { label: '生产订单', key: '/production-order', authKey: 'production-order' }
    ]
  },
  {
    label: '权限管理',
    key: '/perm-management',
    authKey: 'perm-management',
    children: [{ label: '角色管理', key: '/roles', authKey: 'roles' }]
  }
]
