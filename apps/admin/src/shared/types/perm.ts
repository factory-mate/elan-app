export type PermCode =
  | 'x:x:x' // 不需要权限
  | 'digital-modeling' // 数字化建模
  | 'coding-scheme' // 编码方案
  | 'coding-scheme:view'
  | 'coding-scheme:add'
  | 'coding-scheme:edit'
  | 'coding-scheme:detail'
  | 'coding-scheme:delete'
  | 'basic-settings' // 基本设置
  | 'orgs' // 组织架构
  | 'department' // 部门档案
  | 'department:view'
  | 'department:add'
  | 'department:edit'
  | 'department:delete'
  | 'employee' // 职员档案
  | 'employee:view'
  | 'employee:add'
  | 'employee:edit'
  | 'employee:delete'
  | 'employee:edit-dept'
  | 'employee:edit-position'
  | 'employee:freeze'
  | 'employee:unfreeze'
  | 'employee:reset-password'
  | 'products' // 产品建模
  | 'unit-class' // 计量单位组档案
  | 'unit-class:view'
  | 'unit-class:add'
  | 'unit-class:edit'
  | 'unit-class:delete'
  | 'unit' // 计量单位档案
  | 'unit:view'
  | 'unit:add'
  | 'unit:edit'
  | 'unit:delete'
  | 'inventory-class' // 料品分类
  | 'inventory-class:view'
  | 'inventory-class:add'
  | 'inventory-class:edit'
  | 'inventory-class:delete'
  | 'inventory' // 料品档案
  | 'inventory:view'
  | 'inventory:add'
  | 'inventory:edit'
  | 'inventory:delete'
  | 'craft' // 工艺
  | 'process' // 工序档案
  | 'step' // 工步档案
  | 'craft-route' // 工艺路线
  | 'bom' // 物料清单/配方
  | 'bom:view'
  | 'bom:add'
  | 'bom:edit'
  | 'bom:delete'
  | 'bom:import'
  | 'bom:export'
  | 'bom:audit'
  | 'bom:quit-audit'
  | 'merchants' // 客商信息
  | 'customer-class' // 客户分类
  | 'customer-class:view'
  | 'customer-class:add'
  | 'customer-class:edit'
  | 'customer-class:delete'
  | 'customer' // 客户档案
  | 'customer:view'
  | 'customer:add'
  | 'customer:edit'
  | 'customer:delete'
  | 'vendor-class' // 供应商分类
  | 'vendor-class:view'
  | 'vendor-class:add'
  | 'vendor-class:edit'
  | 'vendor-class:delete'
  | 'vendor' // 供应商档案
  | 'vendor:view'
  | 'vendor:add'
  | 'vendor:edit'
  | 'vendor:delete'
  | 'production-plan' // 生产计划
  | 'sales-order' // 销售订单
  | 'sales-order:view'
  | 'sales-order:delete'
  | 'sales-order:sync'
  | 'production-order' // 生产订单
  | 'production-order:view'
  | 'production-order:add'
  | 'production-order:edit'
  | 'production-order:delete'
  | 'report' // 报表
  | 'cost' // 成本
  | 'bom-cost'
  | 'bom-cost:view'
  | 'production' // 生产
  | 'production-material'
  | 'production-material:view'
  | 'qc' // 质量
  | 'normal-material' // 质控常规报告
  | 'normal-material:view'
  | 'all-material' // 质控所有成分报告
  | 'all-material:view'
  | 'bom-content' // 配方含量查询
  | 'bom-content:view'
  | 'trace' // 产品追溯
  | 'production-date-diff'
  | 'production-date-diff:view'
  | 'perm-management' // 权限管理
  | 'roles' // 角色管理
  | 'roles:view'
  | 'roles:add'
  | 'roles:edit'
  | 'roles:delete'
