import type { TreeProps, TreeSelectProps } from 'antd'

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
