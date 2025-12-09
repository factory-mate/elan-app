import type { TreeDataNode } from 'antd'

export const Route = createLazyFileRoute('/_base/menus/')({
  component: RouteComponent
})

const treeData: TreeDataNode[] = [
  {
    key: 'digital-modeling',
    title: '数字化建模 digital-modeling',
    children: [
      {
        key: 'basic-settings',
        title: '基本设置 basic-settings',
        children: [
          {
            key: 'coding-scheme',
            title: '编码方案 coding-scheme',
            children: [
              { key: 'coding-scheme:view', title: '查看 coding-scheme:view' },
              { key: 'coding-scheme:add', title: '新增 coding-scheme:add' },
              { key: 'coding-scheme:edit', title: '编辑 coding-scheme:edit' },
              { key: 'coding-scheme:delete', title: '删除 coding-scheme:delete' }
            ]
          }
        ]
      },
      {
        key: 'orgs',
        title: '组织架构 orgs',
        children: [
          {
            key: 'department',
            title: '部门档案 department',
            children: [
              { key: 'department:view', title: '查看 department:view' },
              { key: 'department:add', title: '新增 department:add' },
              { key: 'department:edit', title: '编辑 department:edit' },
              { key: 'department:delete', title: '删除 department:delete' }
            ]
          },
          {
            key: 'employee',
            title: '职员档案 employee',
            children: [
              { key: 'employee:view', title: '查看 employee:view' },
              { key: 'employee:add', title: '新增 employee:add' },
              { key: 'employee:edit', title: '编辑 employee:edit' },
              { key: 'employee:delete', title: '删除 employee:delete' },
              { key: 'employee:edit-role', title: '修改角色 employee:edit-role' },
              { key: 'employee:edit-dept', title: '修改部门 employee:edit-dept' },
              { key: 'employee:edit-position', title: '修改职务 employee:edit-position' },
              { key: 'employee:freeze', title: '冻结 employee:freeze' },
              { key: 'employee:unfreeze', title: '解冻 employee:unfreeze' },
              { key: 'employee:reset-password', title: '重置密码 employee:reset-password' }
            ]
          }
        ]
      },
      {
        key: 'products',
        title: '产品建模 products',
        children: [
          {
            key: 'unit-class',
            title: '计量单位组档案 unit-class',
            children: [
              { key: 'unit-class:view', title: '查看 unit-class:view' },
              { key: 'unit-class:add', title: '新增 unit-class:add' },
              { key: 'unit-class:edit', title: '编辑 unit-class:edit' },
              { key: 'unit-class:delete', title: '删除 unit-class:delete' }
            ]
          },
          {
            key: 'unit',
            title: '计量单位档案 unit',
            children: [
              { key: 'unit:view', title: '查看 unit:view' },
              { key: 'unit:add', title: '新增 unit:add' },
              { key: 'unit:edit', title: '编辑 unit:edit' },
              { key: 'unit:delete', title: '删除 unit:delete' }
            ]
          },
          {
            key: 'inventory-class',
            title: '料品分类 inventory-class',
            children: [
              { key: 'inventory-class:view', title: '查看 inventory-class:view' },
              { key: 'inventory-class:add', title: '新增 inventory-class:add' },
              { key: 'inventory-class:edit', title: '编辑 inventory-class:edit' },
              { key: 'inventory-class:delete', title: '删除 inventory-class:delete' }
            ]
          },
          {
            key: 'inventory',
            title: '料品档案 inventory',
            children: [
              { key: 'inventory:view', title: '查看 inventory:view' },
              { key: 'inventory:add', title: '新增 inventory:add' },
              { key: 'inventory:edit', title: '编辑 inventory:edit' },
              { key: 'inventory:delete', title: '删除 inventory:delete' }
            ]
          },
          {
            key: 'bom',
            title: '物料清单/配方 bom',
            children: [
              { key: 'bom:view', title: '查看 bom:view' },
              { key: 'bom:add', title: '新增 bom:add' },
              { key: 'bom:edit', title: '编辑 bom:edit' },
              { key: 'bom:delete', title: '删除 bom:delete' },
              { key: 'bom:audit', title: '审核 bom:audit' },
              { key: 'bom:quit-audit', title: '弃审 bom:quit-audit' },
              { key: 'bom:import', title: '导入 bom:import' },
              { key: 'bom:export', title: '导出 bom:export' }
            ]
          },
          {
            key: 'craft',
            title: '工艺 craft',
            children: [
              {
                key: 'process',
                title: '工序档案 process',
                children: [
                  { key: 'process:view', title: '查看 process:view' },
                  { key: 'process:add', title: '新增 process:add' },
                  { key: 'process:edit', title: '编辑 process:edit' },
                  { key: 'process:delete', title: '删除 process:delete' }
                ]
              },
              {
                key: 'step',
                title: '工步档案 step',
                children: [
                  { key: 'step:view', title: '查看 step:view' },
                  { key: 'step:add', title: '新增 step:add' },
                  { key: 'step:edit', title: '编辑 step:edit' },
                  { key: 'step:delete', title: '删除 step:delete' }
                ]
              },
              {
                key: 'craft-route',
                title: '工艺路线 craft-route',
                children: [
                  { key: 'craft-route:view', title: '查看 craft-route:view' },
                  { key: 'craft-route:add', title: '新增 craft-route:add' },
                  { key: 'craft-route:edit', title: '编辑 craft-route:edit' },
                  { key: 'craft-route:delete', title: '删除 craft-route:delete' }
                ]
              }
            ]
          }
        ]
      },
      {
        key: 'merchants',
        title: '客商信息 merchants',
        children: [
          {
            key: 'customer-class',
            title: '客户分类 customer-class',
            children: [
              { key: 'customer-class:view', title: '查看 customer-class:view' },
              { key: 'customer-class:add', title: '新增 customer-class:add' },
              { key: 'customer-class:edit', title: '编辑 customer-class:edit' },
              { key: 'customer-class:delete', title: '删除 customer-class:delete' }
            ]
          },
          {
            key: 'customer',
            title: '客户档案 customer',
            children: [
              { key: 'customer:view', title: '查看 customer:view' },
              { key: 'customer:add', title: '新增 customer:add' },
              { key: 'customer:edit', title: '编辑 customer:edit' },
              { key: 'customer:delete', title: '删除 customer:delete' }
            ]
          },
          {
            key: 'vendor-class',
            title: '供应商分类 vendor-class',
            children: [
              { key: 'vendor-class:view', title: '查看 vendor-class:view' },
              { key: 'vendor-class:add', title: '新增 vendor-class:add' },
              { key: 'vendor-class:edit', title: '编辑 vendor-class:edit' },
              { key: 'vendor-class:delete', title: '删除 vendor-class:delete' }
            ]
          },
          {
            key: 'vendor',
            title: '供应商档案 vendor',
            children: [
              { key: 'vendor:view', title: '查看 vendor:view' },
              { key: 'vendor:add', title: '新增 vendor:add' },
              { key: 'vendor:edit', title: '编辑 vendor:edit' },
              { key: 'vendor:delete', title: '删除 vendor:delete' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'supply-chain-mgt',
    title: '供应链管理 supply-chain-mgt',
    children: [
      {
        key: 'sales-mgt',
        title: '销售管理 sales-mgt',
        children: [
          {
            key: 'sales-order',
            title: '销售订单 sales-order',
            children: [
              { key: 'sales-order:view', title: '查看 sales-order:view' },
              { key: 'sales-order:add', title: '新增 sales-order:add' },
              { key: 'sales-order:delete', title: '删除 sales-order:delete' },
              { key: 'sales-order:sync', title: '同步 sales-order:sync' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'plan-mgt',
    title: '计划管理 plan-mgt',
    children: [
      {
        key: 'production-plan',
        title: '生产计划 production-plan',
        children: [
          {
            key: 'mps-params',
            title: 'MPS参数 mps-params',
            children: [
              { key: 'mps-params:view', title: '查看 mps-params:view' },
              { key: 'mps-params:edit', title: '编辑 mps-params:edit' }
            ]
          },
          {
            key: 'main-production-plan-mps',
            title: '主生产计划MPS运算 main-production-plan-mps',
            children: [
              { key: 'main-production-plan-mps:view', title: '查看 main-production-plan-mps:view' },
              { key: 'main-production-plan-mps:edit', title: '编辑 main-production-plan-mps:edit' },
              {
                key: 'main-production-plan-mps:delete',
                title: '删除 main-production-plan-mps:delete'
              },
              {
                key: 'main-production-plan-mps:compute',
                title: 'MPS运算 main-production-plan-mps:compute'
              },
              {
                key: 'main-production-plan-mps:push',
                title: '生单 main-production-plan-mps:push'
              },
              {
                key: 'main-production-plan-mps:cancel-push',
                title: '撤单 main-production-plan-mps:cancel-push'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'production-mgt',
    title: '生产管理 production-mgt',
    children: [
      {
        key: 'production-order',
        title: '生产订单 production-order',
        children: [
          { key: 'production-order:view', title: '查看 production-order:view' },
          { key: 'production-order:add', title: '新增 production-order:add' },
          { key: 'production-order:edit', title: '编辑 production-order:edit' },
          { key: 'production-order:delete', title: '删除 production-order:delete' },
          { key: 'production-order:print', title: '打印 production-order:print' },
          { key: 'production-order:audit', title: '审核 production-order:audit' },
          { key: 'production-order:audit', title: '弃审 production-order:audit' },
          { key: 'production-order:open', title: '打开 production-order:open' },
          { key: 'production-order:close', title: '关闭 production-order:close' }
        ]
      }
    ]
  },
  {
    key: 'report',
    title: '报表 report',
    children: [
      {
        key: 'cost',
        title: '成本 cost',
        children: [
          {
            key: 'bom-cost',
            title: 'BOM Cost bom-cost',
            children: [
              { key: 'bom-cost:view', title: '查看 bom-cost:view' },
              { key: 'bom-cost:export', title: '导出 bom-cost:export' },
              { key: 'bom-cost:print', title: '打印 bom-cost:print' }
            ]
          }
        ]
      },
      {
        key: 'production',
        title: '生产 production',
        children: [
          {
            key: 'production-material',
            title: '生产用料明细表 production-material',
            children: [
              { key: 'production-material:view', title: '查看 production-material:view' },
              { key: 'production-material:export', title: '导出 production-material:export' }
            ]
          }
        ]
      },
      {
        key: 'qc',
        title: '质量 qc',
        children: [
          {
            key: 'normal-material',
            title: '质控常规报告 normal-material',
            children: [
              { key: 'normal-material:view', title: '查看 normal-material:view' },
              { key: 'normal-material:export', title: '导出 normal-material:export' },
              { key: 'normal-material:toy', title: '过敏源数据 normal-material:toy' }
            ]
          },
          {
            key: 'all-material',
            title: '质控所有成分报告 all-material',
            children: [
              { key: 'all-material:view', title: '查看 all-material:view' },
              { key: 'all-material:export', title: '导出 all-material:export' }
            ]
          },
          {
            key: 'bom-content',
            title: '配方含量查询 bom-content',
            children: [
              { key: 'bom-content:view', title: '查看 bom-content:view' },
              { key: 'bom-content:export', title: '导出 bom-content:export' }
            ]
          }
        ]
      },
      {
        key: 'trace',
        title: '产品追溯 trace',
        children: [
          {
            key: 'production-date-diff',
            title: '生产日期差异报表 production-date-diff',
            children: [
              { key: 'production-date-diff:view', title: '查看 production-date-diff:view' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'perm-mgt',
    title: '权限管理 perm-mgt',
    children: [
      {
        key: 'roles',
        title: '角色管理 roles',
        children: [
          { key: 'roles:view', title: '查看 roles:view' },
          { key: 'roles:add', title: '新增 roles:add' },
          { key: 'roles:edit', title: '编辑 roles:edit' },
          { key: 'roles:delete', title: '删除 roles:delete' },
          { key: 'roles:assign-perms', title: '分配权限 roles:assign-perms' }
        ]
      }
    ]
  }
]

function RouteComponent() {
  const treeRef = useRef<any>()

  return (
    <PageContainer>
      <Tree
        ref={treeRef}
        treeData={treeData}
        showLine
        checkStrictly
        defaultExpandAll
      />
    </PageContainer>
  )
}
