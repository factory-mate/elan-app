import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale'
import { ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community'
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise'

LicenseManager.setLicenseKey('')

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
  stopEditingWhenCellsLoseFocus: true
})

export * from './utils'
