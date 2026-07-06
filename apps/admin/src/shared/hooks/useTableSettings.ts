import type {
  DefaultMenuItem,
  GetContextMenuItemsParams,
  GridReadyEvent,
  MenuItemDef
} from 'ag-grid-enterprise'

import * as TableSettings from '@/features/table-settings'

export const useTableSettings = () => {
  const location = useLocation()

  const tableCacheStore = useTableCacheStore()

  const saveMutation = TableSettings.useSaveMutation()
  const clearMutation = TableSettings.useClearMutation()

  const getContextMenuItems = useCallback(
    (
      params: GetContextMenuItemsParams
    ): (DefaultMenuItem | MenuItemDef)[] | Promise<(DefaultMenuItem | MenuItemDef)[]> => {
      const result: (DefaultMenuItem | MenuItemDef)[] = [
        'cut',
        'copy',
        'copyWithHeaders',
        'copyWithGroupHeaders',
        'paste',
        'separator',
        'export',
        'separator',
        {
          name: '保存表格状态',
          action: () => {
            const key = tableCacheStore.getKey(location.pathname, params.api.getGridId())
            const value = JSON.stringify({
              columnState: params.api.getColumnState(),
              columnGroupState: params.api.getColumnGroupState()
            })
            tableCacheStore.setItem(key, value)
            saveMutation.mutate({ key, value })
          }
        },
        {
          name: '重置表格状态',
          action: () => {
            const key = tableCacheStore.getKey(location.pathname, params.api.getGridId())
            params.api.resetColumnState()
            params.api.resetColumnGroupState()
            tableCacheStore.removeItem(key)
            clearMutation.mutate(key)
          }
        }
      ]
      return result
    },
    [clearMutation, location.pathname, saveMutation, tableCacheStore]
  )

  const initTableSettings = (e: GridReadyEvent) => {
    try {
      const key = tableCacheStore.getKey(location.pathname, e.api.getGridId())
      const { columnState, columnGroupState } = JSON.parse(tableCacheStore.getItem(key) ?? '{}')
      if (columnState) {
        e.api.applyColumnState({
          state: columnState,
          applyOrder: true
        })
      }
      if (columnGroupState) {
        e.api.setColumnGroupState(columnGroupState)
      }
    } catch {
      //
    }
  }

  return { getContextMenuItems, initTableSettings }
}
