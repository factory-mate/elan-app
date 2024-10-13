import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { ModuleRegistry, provideGlobalGridOptions } from '@ag-grid-community/core'
import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale'

ModuleRegistry.registerModules([ClientSideRowModelModule])

provideGlobalGridOptions({
  localeText: AG_GRID_LOCALE_CN
})

export * from './utils'
