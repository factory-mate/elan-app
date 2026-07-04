import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale'
import {
  AllEnterpriseModule,
  LicenseManager,
  ModuleRegistry,
  provideGlobalGridOptions
} from 'ag-grid-enterprise'

LicenseManager.setLicenseKey(
  '[v3][RELEASE][0102]_NDg2Njc4MzY3MDgzNw==16d78ca762fb5d2ff740aed081e2af7b'
)

ModuleRegistry.registerModules([AllEnterpriseModule])

provideGlobalGridOptions({
  localeText: AG_GRID_LOCALE_CN,
  headerHeight: 36,
  rowHeight: 36,
  tooltipShowDelay: 1000,
  tooltipHideDelay: 5000,
  tooltipTrigger: 'hover',
  noRowsOverlayComponent: () => '暂无数据',
  singleClickEdit: true,
  stopEditingWhenCellsLoseFocus: true,
  animateColumnResizing: true
})

export * from './utils'
