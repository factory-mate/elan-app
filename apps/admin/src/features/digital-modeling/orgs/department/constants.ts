import type { SelectProps, TreeProps, TreeSelectProps } from 'antd'

export const departmentTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'cDepCode',
  title: 'cDepName',
  children: 'Child'
}

export const departmentTreeSelectFieldNames: TreeSelectProps['fieldNames'] = {
  label: 'cDepName',
  value: 'cDepCode',
  children: 'Child'
}

export const departmentSelectFieldNames: SelectProps['fieldNames'] = {
  label: 'cDepName',
  value: 'cDepCode'
}
