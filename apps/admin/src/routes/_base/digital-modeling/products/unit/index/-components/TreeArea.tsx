import type { Dispatch, Key, SetStateAction } from 'react'

import { fullListQO } from '@/features/unit-class'

interface TreeAreaProps {
  selectedTreeKeys: Key[]
  setSelectedTreeKeys: Dispatch<SetStateAction<Key[]>>
}

export default function TreeArea(props: TreeAreaProps) {
  const { selectedTreeKeys, setSelectedTreeKeys } = props

  const { data } = useSuspenseQuery(fullListQO({}))

  return (
    <Tree
      className="h-[calc(100vh-170px)]"
      treeData={data}
      checkable
      checkedKeys={selectedTreeKeys}
      onCheck={(checked) => setSelectedTreeKeys([...(checked as Key[])])}
      fieldNames={{
        title: 'cUnitClassName',
        key: 'cUnitClassCode'
      }}
    />
  )
}
