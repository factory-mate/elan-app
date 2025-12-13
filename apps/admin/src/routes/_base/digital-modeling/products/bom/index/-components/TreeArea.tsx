import type { Dispatch, SetStateAction } from 'react'

import { bomClassTreeFieldNames, type BOMVo, treeQO } from '@/features/bom'

interface TreeAreaProps {
  setSelectedTreeData: Dispatch<SetStateAction<BOMVo | null>>
}

export default function TreeArea(props: TreeAreaProps) {
  const { setSelectedTreeData } = props

  const [selectedTreeKeys, setSelectedTreeKeys] = useState<string[]>([])
  // const [searchText, setSearchText] = useState('')
  // const [currentSearchText, setCurrentSearchText] = useState('')

  const { data } = useSuspenseQuery(treeQO())

  return (
    <Space
      className="pr-2"
      orientation="vertical"
    >
      {/* <Input.Search
        placeholder="请输入关键字"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={(value) => setCurrentSearchText(value)}
      /> */}
      <Tree
        className="h-[calc(100vh-140px)]"
        treeData={data}
        selectedKeys={selectedTreeKeys}
        onSelect={(selectedKeys, info) => {
          setSelectedTreeKeys([...selectedKeys.map((i) => i.toString())])
          setSelectedTreeData(info.node ?? null)
        }}
        fieldNames={bomClassTreeFieldNames}
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
