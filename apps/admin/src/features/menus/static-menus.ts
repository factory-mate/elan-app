import type { MenuProps } from 'antd'

export const staticMenus: NonNullable<MenuProps['items']> = [
  { label: '仪表盘', key: '/' },
  {
    label: '数字化建模',
    key: '/digital-modeling',
    children: [
      {
        label: '组织架构',
        key: '/orgs',
        children: [
          // { label: '公司档案', key: '/company' },
          { label: '部门档案', key: '/department' },
          { label: '职员档案', key: '/employee' }
          // { label: '工厂档案', key: '/factory' },
          // { label: '车间档案', key: '/workshop' }
        ]
      },
      {
        label: '产品建模',
        key: '/products',
        children: [
          { label: '计量单位组档案', key: '/unit-class' },
          { label: '计量单位档案', key: '/unit' },
          { label: '料品分类', key: '/inventory-class' },
          { label: '料品档案', key: '/inventory' },
          { label: '物料清单/配方', key: '/material-recipe' }
          // { label: '工序档案', key: '/process' },
          // { label: '工艺路线档案', key: '/process-route' }
        ]
      },
      {
        label: '客商信息',
        key: '/merchants',
        children: [
          { label: '客户分类', key: '/customer-class' },
          { label: '客户档案', key: '/customer' },
          { label: '供应商分类', key: '/vendor-class' },
          { label: '供应商档案', key: '/vendor' }
        ]
      }
    ]
  },
  {
    label: '生产计划',
    key: '/production-plan',
    children: [
      {
        label: '销售订单',
        key: '/sales-order'
      }
    ]
  }
]

export const menuAuthCodeMap = new Map<string, string>([
  ['/', '*'],
  ['/digital-modeling', '300'],
  ['/products', '300300'],
  ['/unit-group', '300300301'],
  ['/unit', '300300305'],
  ['/material-category', '300300309'],
  ['/material', '300300313'],
  ['/recipe', '300300317'],
  ['/process', '300300321'],
  ['/process-route', '300300325']
])
