import type { SelectProps, TreeProps, TreeSelectProps } from 'antd'

export const inventoryClassTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'cInvClassCode',
  title: 'cInvClassName',
  children: 'Child'
}

export const inventoryClassTreeSelectFieldNames: TreeSelectProps['fieldNames'] = {
  label: 'cInvClassName',
  value: 'cInvClassCode',
  children: 'Child'
}

export const inventoryClassSelectFieldNames: SelectProps['fieldNames'] = {
  label: 'cInvClassName',
  value: 'cInvClassCode'
}
