import type { TreeProps, TreeSelectProps } from 'antd'

export const vendorClassTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'cVendorClassCode',
  title: 'cVendorClassName',
  children: 'Child'
}

export const vendorClassTreeSelectFieldNames: TreeSelectProps['fieldNames'] = {
  label: 'cVendorClassName',
  value: 'cVendorClassCode',
  children: 'Child'
}
