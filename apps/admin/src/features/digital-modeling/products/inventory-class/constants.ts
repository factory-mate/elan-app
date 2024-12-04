import type { TreeProps, TreeSelectProps } from 'antd'

export const inventoryClassTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'cInventoryClassCode',
  title: 'cInventoryClassName',
  children: 'Child'
}

export const inventoryClassTreeSelectFieldNames: TreeSelectProps['fieldNames'] = {
  value: 'cInventoryClassCode',
  label: 'cInventoryClassName',
  children: 'Child'
}
