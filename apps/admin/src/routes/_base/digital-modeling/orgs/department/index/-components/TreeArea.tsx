import type { Dispatch, Key, SetStateAction } from 'react'

import { treeQO } from '@/features/department'

interface TreeAreaProps {
  selectedTreeKeys: Key[]
  setSelectedTreeKeys: Dispatch<SetStateAction<Key[]>>
}

export default function TreeArea(props: TreeAreaProps) {
  const { selectedTreeKeys, setSelectedTreeKeys } = props

  const { data } = useQuery(treeQO())

  return (
    <Tree
      className="h-[calc(100vh-170px)]"
      treeData={data}
      checkable
      checkedKeys={selectedTreeKeys}
      onCheck={(checked) => setSelectedTreeKeys([...(checked as Key[])])}
      fieldNames={{
        key: 'cDepCode',
        title: 'cDepName',
        children: 'Child'
      }}
    />
  )
}
