import { useAsyncEffect } from 'ahooks'
import type { Dispatch, Key, SetStateAction } from 'react'

import {
  codeListQO,
  type PermTreeItemVo,
  type PermVo,
  treeQO,
  useSetPermsMutation
} from '@/features/perms'

import type { SetPermsModalMeta } from '../-types'

interface SetPermsModalProps {
  meta?: SetPermsModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function SetPermsModal(props: SetPermsModalProps) {
  const { meta, open, setOpen } = props

  const { data: treeData = [] } = useQuery(treeQO())

  const editMutation = useSetPermsMutation()

  const [checkedKeys, setCheckedKeys] = useState<Key[]>([])

  const getFlattenedTree = (tree: PermTreeItemVo[]) => {
    const flatten = (t: PermTreeItemVo[]) =>
      t.reduce((acc, i) => {
        acc.push(i)
        if (i.Child) {
          acc.push(...flatten(i.Child))
        }
        return acc
      }, [] as PermTreeItemVo[])
    return flatten(tree.map((i) => ({ ...i, Child: i.Child ? flatten(i.Child) : [] })))
  }

  const getAncestorKeys = (node: PermVo) => {
    const ancestors: string[] = []
    const findAncestorKeys = (n: PermVo) => {
      const parent = getFlattenedTree(treeData).find((i) => i.cMenuCode === n.cParentCode)
      if (parent) {
        ancestors.push(parent.cMenuCode!)
        findAncestorKeys(parent)
      }
    }
    findAncestorKeys(node)
    return ancestors
  }

  const getDescendantKeys = (node: PermVo) => {
    const descendants: string[] = []
    const findDescendantKeys = (n: PermVo) => {
      const children = getFlattenedTree(treeData).filter((i) => i.cParentCode === n.cMenuCode)
      if (children.length) {
        descendants.push(...children.map((i) => i.cMenuCode!))
        children.forEach((child) => findDescendantKeys(child))
      }
    }
    findDescendantKeys(node)
    return descendants
  }

  useAsyncEffect(async () => {
    if (open) {
      const codeListData =
        (await queryClient.fetchQuery(
          codeListQO({
            conditions: queryBuilder([{ key: 'cRoleCode', type: 'eq', val: meta?.cRoleCode }])
          })
        )) ?? []
      setCheckedKeys(
        Array.from(
          new Set(
            codeListData.filter((i) => i.cMenuCode).map((i) => i.cOperationCode! ?? i.cMenuCode!)
          )
        )
      )
    } else {
      setCheckedKeys([])
    }
  }, [open])

  return (
    <Modal
      title="权限配置"
      open={open}
      onOk={() => {
        editMutation.mutate(
          {
            models: Array.from(
              new Set(getFlattenedTree(treeData).filter((i) => checkedKeys.includes(i.cMenuCode!)))
            ).map((i) => ({
              cRoleCode: meta!.cRoleCode,
              cMenuCode: i.cModelCode === 'Operation' ? i.cParentCode : i.cMenuCode,
              cOperationCode: i.cModelCode === 'Operation' ? i.cMenuCode : undefined
            }))
          },
          {
            onSuccess: () => setOpen?.(false)
          }
        )
      }}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="40%"
      okButtonProps={{
        loading: editMutation.isPending,
        disabled: editMutation.isPending
      }}
    >
      <Tree
        treeData={treeData}
        checkedKeys={checkedKeys}
        checkable
        showLine
        checkStrictly
        fieldNames={{
          children: 'Child',
          title: 'cMenuName',
          key: 'cMenuCode'
        }}
        onCheck={(_, info) => {
          const { node } = info
          const ancestors = getAncestorKeys(node)
          const descendants = getDescendantKeys(node)
          if (info.checked) {
            const targetCheckedKeys = Array.from(
              new Set([...checkedKeys, node.cMenuCode!, ...ancestors, ...descendants])
            )
            setCheckedKeys(targetCheckedKeys)
          } else {
            const targetCheckedKeys = checkedKeys.filter(
              (i) => !Array.from(new Set([node.cMenuCode, ...descendants])).includes(i?.toString())
            )
            setCheckedKeys(targetCheckedKeys)
          }
        }}
      />
    </Modal>
  )
}
