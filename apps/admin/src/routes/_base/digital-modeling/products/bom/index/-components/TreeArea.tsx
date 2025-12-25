import type { Dispatch, SetStateAction } from 'react'

import { type BOMVo, treeQO } from '@/features/bom'

interface TreeAreaProps {
  setSelectedTreeData: Dispatch<SetStateAction<BOMVo | null>>
}

export default function TreeArea(props: TreeAreaProps) {
  const { setSelectedTreeData } = props

  const [selectedTreeKeys, setSelectedTreeKeys] = useState<string[]>([])

  const { data } = useQuery(treeQO())

  return (
    <Space
      className="pr-2"
      orientation="vertical"
    >
      <Tree
        className="h-[calc(100vh-220px)]"
        treeData={data}
        selectedKeys={selectedTreeKeys}
        onSelect={(selectedKeys, info) => {
          setSelectedTreeKeys([...selectedKeys.map((i) => i.toString())])
          setSelectedTreeData(info.node ?? null)
        }}
        fieldNames={{
          key: 'Id',
          title: 'cInvName',
          children: 'Child'
        }}
        titleRender={(node) => (
          <Space size="large">
            <span>{node.cInvCode}</span>
            <span>{node.cInvName}</span>
            <span>{node.cInvstd}</span>
            <span>{node.cVersion}</span>
          </Space>
        )}
      />
    </Space>
  )
}
