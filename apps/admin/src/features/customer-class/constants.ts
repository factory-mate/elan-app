import type { TreeProps, TreeSelectProps } from 'antd'

export const customerClassTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'cCustomerClassCode',
  title: 'cCustomerClassName',
  children: 'Child'
}

export const customerClassTreeSelectFieldNames: TreeSelectProps['fieldNames'] = {
  value: 'cCustomerClassCode',
  label: 'cCustomerClassName',
  children: 'Child'
}
