import type { MenuProps } from 'antd'

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
          { label: '配方角色对照', key: '/recipe-role-ref', permCode: 'recipe-role-ref' },
          {
            label: '工艺',
            key: '/craft',
            permCode: 'craft',
            children: [
              { label: '工序档案', key: '/process', permCode: 'process' },
              { label: '工步档案', key: '/step', permCode: 'step' },
              { label: '工艺路线', key: '/craft-route', permCode: 'craft-route' }
            ]
          }
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
    label: '供应链管理',
    key: '/supply-chain-mgt',
    permCode: 'supply-chain-mgt',
    children: [
      {
        label: '销售管理',
        key: '/sales-mgt',
        permCode: 'sales-mgt',
        children: [{ label: '销售订单', key: '/sales-order', permCode: 'sales-order' }]
      }
    ]
  },
  {
    label: '计划管理',
    key: '/plan-mgt',
    permCode: 'plan-mgt',
    children: [
      {
        label: '生产计划',
        key: '/production-plan',
        permCode: 'production-plan',
        children: [
          { label: 'MPS参数', key: '/mps-params', permCode: 'mps-params' },
          {
            label: '主生产计划MPS运算',
            key: '/main-production-plan-mps',
            permCode: 'main-production-plan-mps'
          }
        ]
      }
    ]
  },
  {
    label: '生产管理',
    key: '/production-mgt',
    permCode: 'production-mgt',
    children: [{ label: '生产订单', key: '/production-order', permCode: 'production-order' }]
  },
  {
    label: '报表',
    key: '/report',
    permCode: 'report',
    children: [
      {
        label: '成本',
        key: '/cost',
        permCode: 'cost',
        children: [{ label: 'BOM Cost', key: '/bom-cost', permCode: 'bom-cost' }]
      },
      {
        label: '生产',
        key: '/production',
        permCode: 'production',
        children: [
          {
            label: '生产订单用料明细',
            key: '/production-material',
            permCode: 'production-material'
          }
        ]
      },
      {
        label: '质量',
        key: '/qc',
        permCode: 'qc',
        children: [
          { label: '质控常规报告', key: '/normal-material', permCode: 'normal-material' },
          { label: '质控所有成分报告', key: '/all-material', permCode: 'all-material' },
          { label: '配方含量查询', key: '/bom-content', permCode: 'bom-content' }
        ]
      },
      {
        label: '产品追溯',
        key: '/trace',
        permCode: 'trace',
        children: [
          {
            label: '生产日期差异表',
            key: '/production-date-diff',
            permCode: 'production-date-diff'
          }
        ]
      }
    ]
  },
  {
    label: '权限管理',
    key: '/perm-mgt',
    permCode: 'perm-mgt',
    children: [{ label: '角色管理', key: '/roles', permCode: 'roles' }]
  }
]

type BaseMenuItemType = NonNullable<MenuProps['items']>[number]

type ExtendedMenuItemType = BaseMenuItemType & {
  permCode?: PermCode | PermCode[]
  children?: ExtendedMenuItemType[]
}

type FilteredMenuItemType = Omit<BaseMenuItemType, 'children'> & {
  children?: FilteredMenuItemType[]
}

export function filterMenuTree(
  tree: ExtendedMenuItemType[],
  permCodes: Set<string>,
  whiteList: PermCode[]
): FilteredMenuItemType[] {
  return tree
    .filter((node) => {
      if (!node) {
        return false
      }
      if (!node.permCode) {
        return true
      }
      const codes = Array.isArray(node.permCode) ? node.permCode : [node.permCode]
      return codes.some(
        (code: string) => permCodes.has(code) || whiteList.includes(code as PermCode)
      )
    })
    .map((node) => {
      if (!node) {
        return node
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { permCode, children, ...rest } = node
      if (children) {
        const filteredChildren = filterMenuTree(children, permCodes, whiteList)
        return filteredChildren.length > 0 ? { ...rest, children: filteredChildren } : { ...rest }
      }
      return rest
    })
}
