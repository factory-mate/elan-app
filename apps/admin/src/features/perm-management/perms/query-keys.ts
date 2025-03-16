export const TREE_QK = 'perms:tree'

export const CODE_LIST_QK = 'perms:code-list'

export const treeQK = () => [TREE_QK] as const

export const codeListQK = (params: FullPageDto) => [CODE_LIST_QK, params] as const
