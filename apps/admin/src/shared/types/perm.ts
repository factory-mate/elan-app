export type PermCode =
  // 超管权限
  | 'x:x:x'
  // 数字化建模
  | 'digital-modeling'
  // 数字化建模 - 基本设置
  | 'basic-settings'
  // 数字化建模 - 基本设置 - 编码方案
  | 'coding-scheme'
  | 'coding-scheme:view'
  | 'coding-scheme:add'
  | 'coding-scheme:edit'
  | 'coding-scheme:delete'
  // 数字化建模 - 组织架构
  | 'orgs'
  // 数字化建模 - 组织架构 - 部门档案
  | 'department'
  | 'department:view'
  | 'department:add'
  | 'department:edit'
  | 'department:delete'
  // 数字化建模 - 组织架构 - 职员档案
  | 'employee'
  | 'employee:view'
  | 'employee:add'
  | 'employee:edit'
  | 'employee:delete'
  | 'employee:edit-role' // 修改角色
  | 'employee:edit-dept' // 修改部门
  | 'employee:edit-position' // 修改职务
  | 'employee:freeze' // 冻结
  | 'employee:unfreeze' // 解冻
  | 'employee:reset-password' // 重置密码
  // 数字化建模 - 产品建模
  | 'products'
  // 数字化建模 - 产品建模 - 计量单位组档案
  | 'unit-class'
  | 'unit-class:view'
  | 'unit-class:add'
  | 'unit-class:edit'
  | 'unit-class:delete'
  // 数字化建模 - 产品建模 - 计量单位档案
  | 'unit'
  | 'unit:view'
  | 'unit:add'
  | 'unit:edit'
  | 'unit:delete'
  // 数字化建模 - 产品建模 - 料品分类
  | 'inventory-class'
  | 'inventory-class:view'
  | 'inventory-class:add'
  | 'inventory-class:edit'
  | 'inventory-class:delete'
  // 数字化建模 - 产品建模 - 料品档案
  | 'inventory'
  | 'inventory:view'
  | 'inventory:add'
  | 'inventory:edit'
  | 'inventory:delete'
  // 数字化建模 - 产品建模 - 物料清单/配方
  | 'bom'
  | 'bom:view'
  | 'bom:add'
  | 'bom:edit'
  | 'bom:delete'
  | 'bom:audit'
  | 'bom:quit-audit'
  | 'bom:import'
  | 'bom:export'
  // 数字化建模 - 产品建模 - 工艺
  | 'craft'
  // 数字化建模 - 产品建模 - 工艺 - 工序档案
  | 'process'
  | 'process:view'
  | 'process:add'
  | 'process:edit'
  | 'process:delete'
  // 数字化建模 - 产品建模 - 工艺 - 工步档案
  | 'step'
  | 'step:view'
  | 'step:add'
  | 'step:edit'
  | 'step:delete'
  // 数字化建模 - 产品建模 - 工艺 - 工艺路线
  | 'craft-route'
  | 'craft-route:view'
  | 'craft-route:add'
  | 'craft-route:edit'
  | 'craft-route:delete'
  // 数字化建模 - 客商信息
  | 'merchants'
  // 数字化建模 - 客商信息 - 客户分类
  | 'customer-class'
  | 'customer-class:view'
  | 'customer-class:add'
  | 'customer-class:edit'
  | 'customer-class:delete'
  // 数字化建模 - 客商信息 - 客户档案
  | 'customer'
  | 'customer:view'
  | 'customer:add'
  | 'customer:edit'
  | 'customer:delete'
  // 数字化建模 - 客商信息 - 供应商分类
  | 'vendor-class'
  | 'vendor-class:view'
  | 'vendor-class:add'
  | 'vendor-class:edit'
  | 'vendor-class:delete'
  // 数字化建模 - 客商信息 - 供应商档案
  | 'vendor'
  | 'vendor:view'
  | 'vendor:add'
  | 'vendor:edit'
  | 'vendor:delete'
  // 供应链管理
  | 'supply-chain-mgt'
  // 供应链管理 - 销售管理
  | 'sales-mgt'
  // 供应链管理 - 销售管理 - 销售订单
  | 'sales-order'
  | 'sales-order:view'
  | 'sales-order:delete'
  | 'sales-order:sync'
  // 计划管理
  | 'plan-mgt'
  // 计划管理 - 生产计划
  | 'production-plan'
  // 计划管理 - 生产计划 - MPS参数
  | 'mps-params'
  | 'mps-params:view'
  | 'mps-params:edit'
  // 计划管理 - 生产计划 - 主生产计划MPS运算
  | 'main-production-plan-mps'
  | 'main-production-plan-mps:view'
  | 'main-production-plan-mps:edit'
  | 'main-production-plan-mps:delete'
  | 'main-production-plan-mps:compute'
  | 'main-production-plan-mps:push'
  | 'main-production-plan-mps:cancel-push'
  // 生产管理
  | 'production-mgt'
  // 生产管理 - 生产订单
  | 'production-order'
  | 'production-order:view'
  | 'production-order:add'
  | 'production-order:edit'
  | 'production-order:delete'
  | 'production-order:print'
  | 'production-order:audit'
  | 'production-order:quit-audit'
  | 'production-order:open'
  | 'production-order:close'
  // 报表
  | 'report'
  // 报表 - 成本
  | 'cost'
  // 报表 - 成本 - BOM Cost
  | 'bom-cost'
  | 'bom-cost:view'
  | 'bom-cost:export'
  | 'bom-cost:print'
  // 报表 - 生产
  | 'production'
  // 报表 - 生产 - 生产用料明细表
  | 'production-material'
  | 'production-material:view'
  | 'production-material:export'
  // 报表 - 质量
  | 'qc'
  // 报表 - 质量 - 质控常规报告
  | 'normal-material'
  | 'normal-material:view'
  | 'normal-material:export'
  | 'normal-material:toy'
  // 报表 - 质量 - 质控所有成分报告
  | 'all-material'
  | 'all-material:view'
  | 'all-material:export'
  // 报表 - 质量 - 配方含量查询
  | 'bom-content'
  | 'bom-content:view'
  | 'bom-content:export'
  // 报表 - 产品追溯
  | 'trace'
  // 报表 - 产品追溯 - 生产日期差异报表
  | 'production-date-diff'
  | 'production-date-diff:view'
  // 权限管理
  | 'perm-mgt'
  // 权限管理 - 角色管理
  | 'roles'
  | 'roles:view'
  | 'roles:add'
  | 'roles:edit'
  | 'roles:delete'
  | 'roles:assign-perms'
