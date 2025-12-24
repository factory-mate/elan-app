import type { ModalProps } from 'antd'
import type { PropsWithChildren } from 'react'

import type { FilterAreaProps } from '../FilterArea'

interface RefModalProps extends PropsWithChildren<ModalProps> {
  modal: UseModal<any>
  filterArea: FilterAreaProps
}

export default function RefModal(props: RefModalProps) {
  const { modal, filterArea, children, ...otherProps } = props

  return (
    <Modal
      title="选择数据"
      open={modal.open}
      onCancel={() => modal.setOpen?.(false)}
      forceRender
      width="70%"
      centered
      {...otherProps}
    >
      <Space
        className="w-full pl-2"
        orientation="vertical"
      >
        <FilterArea {...filterArea} />
        {children}
      </Space>
    </Modal>
  )
}
