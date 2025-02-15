import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale'
import { ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community'
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise'

LicenseManager.setLicenseKey('')

ModuleRegistry.registerModules([AllEnterpriseModule])

provideGlobalGridOptions({
  localeText: AG_GRID_LOCALE_CN
})

export * from './utils'
