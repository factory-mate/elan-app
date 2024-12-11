/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './../../routes/__root'
import { Route as PublicRouteImport } from './../../routes/_public/route'
import { Route as BaseRouteImport } from './../../routes/_base/route'
import { Route as SplatRouteImport } from './../../routes/$/route'
import { Route as PublicLoginRouteImport } from './../../routes/_public/login/route'
import { Route as BaseChangePasswordRouteImport } from './../../routes/_base/change-password/route'
import { Route as Base404RouteImport } from './../../routes/_base/404/route'
import { Route as Base403RouteImport } from './../../routes/_base/403/route'
import { Route as BaseIndexRouteImport } from './../../routes/_base/index/route'
import { Route as BaseDigitalModelingMerchantsVendorClassRouteImport } from './../../routes/_base/digital-modeling/merchants/vendor-class/route'
import { Route as BaseDigitalModelingMerchantsVendorRouteImport } from './../../routes/_base/digital-modeling/merchants/vendor/route'
import { Route as BaseProductionPlanSalesOrderIndexRouteImport } from './../../routes/_base/production-plan/sales-order/index/route'
import { Route as BaseProductionPlanProductionOrderIndexRouteImport } from './../../routes/_base/production-plan/production-order/index/route'
import { Route as BaseDigitalModelingOrgsEmployeeSettingsRouteImport } from './../../routes/_base/digital-modeling/orgs/employee/settings/route'
import { Route as BaseDigitalModelingOrgsEmployeeAddRouteImport } from './../../routes/_base/digital-modeling/orgs/employee/add/route'
import { Route as BaseDigitalModelingProductsUnitIndexRouteImport } from './../../routes/_base/digital-modeling/products/unit/index/route'
import { Route as BaseDigitalModelingProductsUnitClassIndexRouteImport } from './../../routes/_base/digital-modeling/products/unit-class/index/route'
import { Route as BaseDigitalModelingProductsInventoryIndexRouteImport } from './../../routes/_base/digital-modeling/products/inventory/index/route'
import { Route as BaseDigitalModelingProductsInventoryClassIndexRouteImport } from './../../routes/_base/digital-modeling/products/inventory-class/index/route'
import { Route as BaseDigitalModelingProductsBomIndexRouteImport } from './../../routes/_base/digital-modeling/products/bom/index/route'
import { Route as BaseDigitalModelingOrgsEmployeeIndexRouteImport } from './../../routes/_base/digital-modeling/orgs/employee/index/route'
import { Route as BaseDigitalModelingOrgsDepartmentIndexRouteImport } from './../../routes/_base/digital-modeling/orgs/department/index/route'
import { Route as BaseDigitalModelingMerchantsCustomerIndexRouteImport } from './../../routes/_base/digital-modeling/merchants/customer/index/route'
import { Route as BaseDigitalModelingMerchantsCustomerClassIndexRouteImport } from './../../routes/_base/digital-modeling/merchants/customer-class/index/route'

// Create/Update Routes

const PublicRouteRoute = PublicRouteImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../routes/_public/route.lazy').then((d) => d.Route),
)

const BaseRouteRoute = BaseRouteImport.update({
  id: '/_base',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../routes/_base/route.lazy').then((d) => d.Route),
)

const SplatRouteRoute = SplatRouteImport.update({
  id: '/$',
  path: '/$',
  getParentRoute: () => rootRoute,
} as any)

const PublicLoginRouteRoute = PublicLoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_public/login/route.lazy').then((d) => d.Route),
)

const BaseChangePasswordRouteRoute = BaseChangePasswordRouteImport.update({
  id: '/change-password',
  path: '/change-password',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/change-password/route.lazy').then(
    (d) => d.Route,
  ),
)

const Base404RouteRoute = Base404RouteImport.update({
  id: '/404',
  path: '/404',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/404/route.lazy').then((d) => d.Route),
)

const Base403RouteRoute = Base403RouteImport.update({
  id: '/403',
  path: '/403',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/403/route.lazy').then((d) => d.Route),
)

const BaseIndexRouteRoute = BaseIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/index/route.lazy').then((d) => d.Route),
)

const BaseDigitalModelingMerchantsVendorClassRouteRoute =
  BaseDigitalModelingMerchantsVendorClassRouteImport.update({
    id: '/digital-modeling/merchants/vendor-class',
    path: '/digital-modeling/merchants/vendor-class',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/merchants/vendor-class/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingMerchantsVendorRouteRoute =
  BaseDigitalModelingMerchantsVendorRouteImport.update({
    id: '/digital-modeling/merchants/vendor',
    path: '/digital-modeling/merchants/vendor',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/merchants/vendor/route.lazy'
    ).then((d) => d.Route),
  )

const BaseProductionPlanSalesOrderIndexRouteRoute =
  BaseProductionPlanSalesOrderIndexRouteImport.update({
    id: '/production-plan/sales-order/',
    path: '/production-plan/sales-order/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/production-plan/sales-order/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseProductionPlanProductionOrderIndexRouteRoute =
  BaseProductionPlanProductionOrderIndexRouteImport.update({
    id: '/production-plan/production-order/',
    path: '/production-plan/production-order/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/production-plan/production-order/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingOrgsEmployeeSettingsRouteRoute =
  BaseDigitalModelingOrgsEmployeeSettingsRouteImport.update({
    id: '/digital-modeling/orgs/employee/settings',
    path: '/digital-modeling/orgs/employee/settings',
    getParentRoute: () => BaseRouteRoute,
  } as any)

const BaseDigitalModelingOrgsEmployeeAddRouteRoute =
  BaseDigitalModelingOrgsEmployeeAddRouteImport.update({
    id: '/digital-modeling/orgs/employee/add',
    path: '/digital-modeling/orgs/employee/add',
    getParentRoute: () => BaseRouteRoute,
  } as any)

const BaseDigitalModelingProductsUnitIndexRouteRoute =
  BaseDigitalModelingProductsUnitIndexRouteImport.update({
    id: '/digital-modeling/products/unit/',
    path: '/digital-modeling/products/unit/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsUnitClassIndexRouteRoute =
  BaseDigitalModelingProductsUnitClassIndexRouteImport.update({
    id: '/digital-modeling/products/unit-class/',
    path: '/digital-modeling/products/unit-class/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit-class/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsInventoryIndexRouteRoute =
  BaseDigitalModelingProductsInventoryIndexRouteImport.update({
    id: '/digital-modeling/products/inventory/',
    path: '/digital-modeling/products/inventory/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/inventory/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsInventoryClassIndexRouteRoute =
  BaseDigitalModelingProductsInventoryClassIndexRouteImport.update({
    id: '/digital-modeling/products/inventory-class/',
    path: '/digital-modeling/products/inventory-class/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/inventory-class/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsBomIndexRouteRoute =
  BaseDigitalModelingProductsBomIndexRouteImport.update({
    id: '/digital-modeling/products/bom/',
    path: '/digital-modeling/products/bom/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/bom/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingOrgsEmployeeIndexRouteRoute =
  BaseDigitalModelingOrgsEmployeeIndexRouteImport.update({
    id: '/digital-modeling/orgs/employee/',
    path: '/digital-modeling/orgs/employee/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/orgs/employee/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingOrgsDepartmentIndexRouteRoute =
  BaseDigitalModelingOrgsDepartmentIndexRouteImport.update({
    id: '/digital-modeling/orgs/department/',
    path: '/digital-modeling/orgs/department/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/orgs/department/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingMerchantsCustomerIndexRouteRoute =
  BaseDigitalModelingMerchantsCustomerIndexRouteImport.update({
    id: '/digital-modeling/merchants/customer/',
    path: '/digital-modeling/merchants/customer/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/merchants/customer/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute =
  BaseDigitalModelingMerchantsCustomerClassIndexRouteImport.update({
    id: '/digital-modeling/merchants/customer-class/',
    path: '/digital-modeling/merchants/customer-class/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/merchants/customer-class/index/route.lazy'
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/$': {
      id: '/$'
      path: '/$'
      fullPath: '/$'
      preLoaderRoute: typeof SplatRouteImport
      parentRoute: typeof rootRoute
    }
    '/_base': {
      id: '/_base'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof BaseRouteImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicRouteImport
      parentRoute: typeof rootRoute
    }
    '/_base/': {
      id: '/_base/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof BaseIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/403': {
      id: '/_base/403'
      path: '/403'
      fullPath: '/403'
      preLoaderRoute: typeof Base403RouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/404': {
      id: '/_base/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof Base404RouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/change-password': {
      id: '/_base/change-password'
      path: '/change-password'
      fullPath: '/change-password'
      preLoaderRoute: typeof BaseChangePasswordRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_public/login': {
      id: '/_public/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLoginRouteImport
      parentRoute: typeof PublicRouteImport
    }
    '/_base/production-plan/production-order/': {
      id: '/_base/production-plan/production-order/'
      path: '/production-plan/production-order'
      fullPath: '/production-plan/production-order'
      preLoaderRoute: typeof BaseProductionPlanProductionOrderIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/production-plan/sales-order/': {
      id: '/_base/production-plan/sales-order/'
      path: '/production-plan/sales-order'
      fullPath: '/production-plan/sales-order'
      preLoaderRoute: typeof BaseProductionPlanSalesOrderIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/merchants/vendor': {
      id: '/_base/digital-modeling/merchants/vendor'
      path: '/digital-modeling/merchants/vendor'
      fullPath: '/digital-modeling/merchants/vendor'
      preLoaderRoute: typeof BaseDigitalModelingMerchantsVendorRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/merchants/vendor-class': {
      id: '/_base/digital-modeling/merchants/vendor-class'
      path: '/digital-modeling/merchants/vendor-class'
      fullPath: '/digital-modeling/merchants/vendor-class'
      preLoaderRoute: typeof BaseDigitalModelingMerchantsVendorClassRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/merchants/customer-class/': {
      id: '/_base/digital-modeling/merchants/customer-class/'
      path: '/digital-modeling/merchants/customer-class'
      fullPath: '/digital-modeling/merchants/customer-class'
      preLoaderRoute: typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/merchants/customer/': {
      id: '/_base/digital-modeling/merchants/customer/'
      path: '/digital-modeling/merchants/customer'
      fullPath: '/digital-modeling/merchants/customer'
      preLoaderRoute: typeof BaseDigitalModelingMerchantsCustomerIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/orgs/department/': {
      id: '/_base/digital-modeling/orgs/department/'
      path: '/digital-modeling/orgs/department'
      fullPath: '/digital-modeling/orgs/department'
      preLoaderRoute: typeof BaseDigitalModelingOrgsDepartmentIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/orgs/employee/': {
      id: '/_base/digital-modeling/orgs/employee/'
      path: '/digital-modeling/orgs/employee'
      fullPath: '/digital-modeling/orgs/employee'
      preLoaderRoute: typeof BaseDigitalModelingOrgsEmployeeIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/products/bom/': {
      id: '/_base/digital-modeling/products/bom/'
      path: '/digital-modeling/products/bom'
      fullPath: '/digital-modeling/products/bom'
      preLoaderRoute: typeof BaseDigitalModelingProductsBomIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/products/inventory-class/': {
      id: '/_base/digital-modeling/products/inventory-class/'
      path: '/digital-modeling/products/inventory-class'
      fullPath: '/digital-modeling/products/inventory-class'
      preLoaderRoute: typeof BaseDigitalModelingProductsInventoryClassIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/products/inventory/': {
      id: '/_base/digital-modeling/products/inventory/'
      path: '/digital-modeling/products/inventory'
      fullPath: '/digital-modeling/products/inventory'
      preLoaderRoute: typeof BaseDigitalModelingProductsInventoryIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/products/unit-class/': {
      id: '/_base/digital-modeling/products/unit-class/'
      path: '/digital-modeling/products/unit-class'
      fullPath: '/digital-modeling/products/unit-class'
      preLoaderRoute: typeof BaseDigitalModelingProductsUnitClassIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/products/unit/': {
      id: '/_base/digital-modeling/products/unit/'
      path: '/digital-modeling/products/unit'
      fullPath: '/digital-modeling/products/unit'
      preLoaderRoute: typeof BaseDigitalModelingProductsUnitIndexRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/orgs/employee/add': {
      id: '/_base/digital-modeling/orgs/employee/add'
      path: '/digital-modeling/orgs/employee/add'
      fullPath: '/digital-modeling/orgs/employee/add'
      preLoaderRoute: typeof BaseDigitalModelingOrgsEmployeeAddRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/orgs/employee/settings': {
      id: '/_base/digital-modeling/orgs/employee/settings'
      path: '/digital-modeling/orgs/employee/settings'
      fullPath: '/digital-modeling/orgs/employee/settings'
      preLoaderRoute: typeof BaseDigitalModelingOrgsEmployeeSettingsRouteImport
      parentRoute: typeof BaseRouteImport
    }
  }
}

// Create and export the route tree

interface BaseRouteRouteChildren {
  BaseIndexRouteRoute: typeof BaseIndexRouteRoute
  Base403RouteRoute: typeof Base403RouteRoute
  Base404RouteRoute: typeof Base404RouteRoute
  BaseChangePasswordRouteRoute: typeof BaseChangePasswordRouteRoute
  BaseProductionPlanProductionOrderIndexRouteRoute: typeof BaseProductionPlanProductionOrderIndexRouteRoute
  BaseProductionPlanSalesOrderIndexRouteRoute: typeof BaseProductionPlanSalesOrderIndexRouteRoute
  BaseDigitalModelingMerchantsVendorRouteRoute: typeof BaseDigitalModelingMerchantsVendorRouteRoute
  BaseDigitalModelingMerchantsVendorClassRouteRoute: typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute: typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  BaseDigitalModelingMerchantsCustomerIndexRouteRoute: typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  BaseDigitalModelingOrgsDepartmentIndexRouteRoute: typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  BaseDigitalModelingOrgsEmployeeIndexRouteRoute: typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  BaseDigitalModelingProductsBomIndexRouteRoute: typeof BaseDigitalModelingProductsBomIndexRouteRoute
  BaseDigitalModelingProductsInventoryClassIndexRouteRoute: typeof BaseDigitalModelingProductsInventoryClassIndexRouteRoute
  BaseDigitalModelingProductsInventoryIndexRouteRoute: typeof BaseDigitalModelingProductsInventoryIndexRouteRoute
  BaseDigitalModelingProductsUnitClassIndexRouteRoute: typeof BaseDigitalModelingProductsUnitClassIndexRouteRoute
  BaseDigitalModelingProductsUnitIndexRouteRoute: typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  BaseDigitalModelingOrgsEmployeeAddRouteRoute: typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  BaseDigitalModelingOrgsEmployeeSettingsRouteRoute: typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
}

const BaseRouteRouteChildren: BaseRouteRouteChildren = {
  BaseIndexRouteRoute: BaseIndexRouteRoute,
  Base403RouteRoute: Base403RouteRoute,
  Base404RouteRoute: Base404RouteRoute,
  BaseChangePasswordRouteRoute: BaseChangePasswordRouteRoute,
  BaseProductionPlanProductionOrderIndexRouteRoute:
    BaseProductionPlanProductionOrderIndexRouteRoute,
  BaseProductionPlanSalesOrderIndexRouteRoute:
    BaseProductionPlanSalesOrderIndexRouteRoute,
  BaseDigitalModelingMerchantsVendorRouteRoute:
    BaseDigitalModelingMerchantsVendorRouteRoute,
  BaseDigitalModelingMerchantsVendorClassRouteRoute:
    BaseDigitalModelingMerchantsVendorClassRouteRoute,
  BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute:
    BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute,
  BaseDigitalModelingMerchantsCustomerIndexRouteRoute:
    BaseDigitalModelingMerchantsCustomerIndexRouteRoute,
  BaseDigitalModelingOrgsDepartmentIndexRouteRoute:
    BaseDigitalModelingOrgsDepartmentIndexRouteRoute,
  BaseDigitalModelingOrgsEmployeeIndexRouteRoute:
    BaseDigitalModelingOrgsEmployeeIndexRouteRoute,
  BaseDigitalModelingProductsBomIndexRouteRoute:
    BaseDigitalModelingProductsBomIndexRouteRoute,
  BaseDigitalModelingProductsInventoryClassIndexRouteRoute:
    BaseDigitalModelingProductsInventoryClassIndexRouteRoute,
  BaseDigitalModelingProductsInventoryIndexRouteRoute:
    BaseDigitalModelingProductsInventoryIndexRouteRoute,
  BaseDigitalModelingProductsUnitClassIndexRouteRoute:
    BaseDigitalModelingProductsUnitClassIndexRouteRoute,
  BaseDigitalModelingProductsUnitIndexRouteRoute:
    BaseDigitalModelingProductsUnitIndexRouteRoute,
  BaseDigitalModelingOrgsEmployeeAddRouteRoute:
    BaseDigitalModelingOrgsEmployeeAddRouteRoute,
  BaseDigitalModelingOrgsEmployeeSettingsRouteRoute:
    BaseDigitalModelingOrgsEmployeeSettingsRouteRoute,
}

const BaseRouteRouteWithChildren = BaseRouteRoute._addFileChildren(
  BaseRouteRouteChildren,
)

interface PublicRouteRouteChildren {
  PublicLoginRouteRoute: typeof PublicLoginRouteRoute
}

const PublicRouteRouteChildren: PublicRouteRouteChildren = {
  PublicLoginRouteRoute: PublicLoginRouteRoute,
}

const PublicRouteRouteWithChildren = PublicRouteRoute._addFileChildren(
  PublicRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/$': typeof SplatRouteRoute
  '': typeof PublicRouteRouteWithChildren
  '/': typeof BaseIndexRouteRoute
  '/403': typeof Base403RouteRoute
  '/404': typeof Base404RouteRoute
  '/change-password': typeof BaseChangePasswordRouteRoute
  '/login': typeof PublicLoginRouteRoute
  '/production-plan/production-order': typeof BaseProductionPlanProductionOrderIndexRouteRoute
  '/production-plan/sales-order': typeof BaseProductionPlanSalesOrderIndexRouteRoute
  '/digital-modeling/merchants/vendor': typeof BaseDigitalModelingMerchantsVendorRouteRoute
  '/digital-modeling/merchants/vendor-class': typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  '/digital-modeling/merchants/customer-class': typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  '/digital-modeling/merchants/customer': typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  '/digital-modeling/orgs/department': typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  '/digital-modeling/orgs/employee': typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  '/digital-modeling/products/bom': typeof BaseDigitalModelingProductsBomIndexRouteRoute
  '/digital-modeling/products/inventory-class': typeof BaseDigitalModelingProductsInventoryClassIndexRouteRoute
  '/digital-modeling/products/inventory': typeof BaseDigitalModelingProductsInventoryIndexRouteRoute
  '/digital-modeling/products/unit-class': typeof BaseDigitalModelingProductsUnitClassIndexRouteRoute
  '/digital-modeling/products/unit': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  '/digital-modeling/orgs/employee/add': typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  '/digital-modeling/orgs/employee/settings': typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
}

export interface FileRoutesByTo {
  '/$': typeof SplatRouteRoute
  '': typeof PublicRouteRouteWithChildren
  '/': typeof BaseIndexRouteRoute
  '/403': typeof Base403RouteRoute
  '/404': typeof Base404RouteRoute
  '/change-password': typeof BaseChangePasswordRouteRoute
  '/login': typeof PublicLoginRouteRoute
  '/production-plan/production-order': typeof BaseProductionPlanProductionOrderIndexRouteRoute
  '/production-plan/sales-order': typeof BaseProductionPlanSalesOrderIndexRouteRoute
  '/digital-modeling/merchants/vendor': typeof BaseDigitalModelingMerchantsVendorRouteRoute
  '/digital-modeling/merchants/vendor-class': typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  '/digital-modeling/merchants/customer-class': typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  '/digital-modeling/merchants/customer': typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  '/digital-modeling/orgs/department': typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  '/digital-modeling/orgs/employee': typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  '/digital-modeling/products/bom': typeof BaseDigitalModelingProductsBomIndexRouteRoute
  '/digital-modeling/products/inventory-class': typeof BaseDigitalModelingProductsInventoryClassIndexRouteRoute
  '/digital-modeling/products/inventory': typeof BaseDigitalModelingProductsInventoryIndexRouteRoute
  '/digital-modeling/products/unit-class': typeof BaseDigitalModelingProductsUnitClassIndexRouteRoute
  '/digital-modeling/products/unit': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  '/digital-modeling/orgs/employee/add': typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  '/digital-modeling/orgs/employee/settings': typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/$': typeof SplatRouteRoute
  '/_base': typeof BaseRouteRouteWithChildren
  '/_public': typeof PublicRouteRouteWithChildren
  '/_base/': typeof BaseIndexRouteRoute
  '/_base/403': typeof Base403RouteRoute
  '/_base/404': typeof Base404RouteRoute
  '/_base/change-password': typeof BaseChangePasswordRouteRoute
  '/_public/login': typeof PublicLoginRouteRoute
  '/_base/production-plan/production-order/': typeof BaseProductionPlanProductionOrderIndexRouteRoute
  '/_base/production-plan/sales-order/': typeof BaseProductionPlanSalesOrderIndexRouteRoute
  '/_base/digital-modeling/merchants/vendor': typeof BaseDigitalModelingMerchantsVendorRouteRoute
  '/_base/digital-modeling/merchants/vendor-class': typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  '/_base/digital-modeling/merchants/customer-class/': typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  '/_base/digital-modeling/merchants/customer/': typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  '/_base/digital-modeling/orgs/department/': typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  '/_base/digital-modeling/orgs/employee/': typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  '/_base/digital-modeling/products/bom/': typeof BaseDigitalModelingProductsBomIndexRouteRoute
  '/_base/digital-modeling/products/inventory-class/': typeof BaseDigitalModelingProductsInventoryClassIndexRouteRoute
  '/_base/digital-modeling/products/inventory/': typeof BaseDigitalModelingProductsInventoryIndexRouteRoute
  '/_base/digital-modeling/products/unit-class/': typeof BaseDigitalModelingProductsUnitClassIndexRouteRoute
  '/_base/digital-modeling/products/unit/': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  '/_base/digital-modeling/orgs/employee/add': typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  '/_base/digital-modeling/orgs/employee/settings': typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/$'
    | ''
    | '/'
    | '/403'
    | '/404'
    | '/change-password'
    | '/login'
    | '/production-plan/production-order'
    | '/production-plan/sales-order'
    | '/digital-modeling/merchants/vendor'
    | '/digital-modeling/merchants/vendor-class'
    | '/digital-modeling/merchants/customer-class'
    | '/digital-modeling/merchants/customer'
    | '/digital-modeling/orgs/department'
    | '/digital-modeling/orgs/employee'
    | '/digital-modeling/products/bom'
    | '/digital-modeling/products/inventory-class'
    | '/digital-modeling/products/inventory'
    | '/digital-modeling/products/unit-class'
    | '/digital-modeling/products/unit'
    | '/digital-modeling/orgs/employee/add'
    | '/digital-modeling/orgs/employee/settings'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/$'
    | ''
    | '/'
    | '/403'
    | '/404'
    | '/change-password'
    | '/login'
    | '/production-plan/production-order'
    | '/production-plan/sales-order'
    | '/digital-modeling/merchants/vendor'
    | '/digital-modeling/merchants/vendor-class'
    | '/digital-modeling/merchants/customer-class'
    | '/digital-modeling/merchants/customer'
    | '/digital-modeling/orgs/department'
    | '/digital-modeling/orgs/employee'
    | '/digital-modeling/products/bom'
    | '/digital-modeling/products/inventory-class'
    | '/digital-modeling/products/inventory'
    | '/digital-modeling/products/unit-class'
    | '/digital-modeling/products/unit'
    | '/digital-modeling/orgs/employee/add'
    | '/digital-modeling/orgs/employee/settings'
  id:
    | '__root__'
    | '/$'
    | '/_base'
    | '/_public'
    | '/_base/'
    | '/_base/403'
    | '/_base/404'
    | '/_base/change-password'
    | '/_public/login'
    | '/_base/production-plan/production-order/'
    | '/_base/production-plan/sales-order/'
    | '/_base/digital-modeling/merchants/vendor'
    | '/_base/digital-modeling/merchants/vendor-class'
    | '/_base/digital-modeling/merchants/customer-class/'
    | '/_base/digital-modeling/merchants/customer/'
    | '/_base/digital-modeling/orgs/department/'
    | '/_base/digital-modeling/orgs/employee/'
    | '/_base/digital-modeling/products/bom/'
    | '/_base/digital-modeling/products/inventory-class/'
    | '/_base/digital-modeling/products/inventory/'
    | '/_base/digital-modeling/products/unit-class/'
    | '/_base/digital-modeling/products/unit/'
    | '/_base/digital-modeling/orgs/employee/add'
    | '/_base/digital-modeling/orgs/employee/settings'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  SplatRouteRoute: typeof SplatRouteRoute
  BaseRouteRoute: typeof BaseRouteRouteWithChildren
  PublicRouteRoute: typeof PublicRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  SplatRouteRoute: SplatRouteRoute,
  BaseRouteRoute: BaseRouteRouteWithChildren,
  PublicRouteRoute: PublicRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/$",
        "/_base",
        "/_public"
      ]
    },
    "/$": {
      "filePath": "$/route.tsx"
    },
    "/_base": {
      "filePath": "_base/route.tsx",
      "children": [
        "/_base/",
        "/_base/403",
        "/_base/404",
        "/_base/change-password",
        "/_base/production-plan/production-order/",
        "/_base/production-plan/sales-order/",
        "/_base/digital-modeling/merchants/vendor",
        "/_base/digital-modeling/merchants/vendor-class",
        "/_base/digital-modeling/merchants/customer-class/",
        "/_base/digital-modeling/merchants/customer/",
        "/_base/digital-modeling/orgs/department/",
        "/_base/digital-modeling/orgs/employee/",
        "/_base/digital-modeling/products/bom/",
        "/_base/digital-modeling/products/inventory-class/",
        "/_base/digital-modeling/products/inventory/",
        "/_base/digital-modeling/products/unit-class/",
        "/_base/digital-modeling/products/unit/",
        "/_base/digital-modeling/orgs/employee/add",
        "/_base/digital-modeling/orgs/employee/settings"
      ]
    },
    "/_public": {
      "filePath": "_public/route.tsx",
      "children": [
        "/_public/login"
      ]
    },
    "/_base/": {
      "filePath": "_base/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/403": {
      "filePath": "_base/403/route.tsx",
      "parent": "/_base"
    },
    "/_base/404": {
      "filePath": "_base/404/route.tsx",
      "parent": "/_base"
    },
    "/_base/change-password": {
      "filePath": "_base/change-password/route.tsx",
      "parent": "/_base"
    },
    "/_public/login": {
      "filePath": "_public/login/route.tsx",
      "parent": "/_public"
    },
    "/_base/production-plan/production-order/": {
      "filePath": "_base/production-plan/production-order/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/production-plan/sales-order/": {
      "filePath": "_base/production-plan/sales-order/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/merchants/vendor": {
      "filePath": "_base/digital-modeling/merchants/vendor/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/merchants/vendor-class": {
      "filePath": "_base/digital-modeling/merchants/vendor-class/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/merchants/customer-class/": {
      "filePath": "_base/digital-modeling/merchants/customer-class/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/merchants/customer/": {
      "filePath": "_base/digital-modeling/merchants/customer/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/orgs/department/": {
      "filePath": "_base/digital-modeling/orgs/department/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/orgs/employee/": {
      "filePath": "_base/digital-modeling/orgs/employee/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/bom/": {
      "filePath": "_base/digital-modeling/products/bom/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/inventory-class/": {
      "filePath": "_base/digital-modeling/products/inventory-class/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/inventory/": {
      "filePath": "_base/digital-modeling/products/inventory/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/unit-class/": {
      "filePath": "_base/digital-modeling/products/unit-class/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/unit/": {
      "filePath": "_base/digital-modeling/products/unit/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/orgs/employee/add": {
      "filePath": "_base/digital-modeling/orgs/employee/add/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/orgs/employee/settings": {
      "filePath": "_base/digital-modeling/orgs/employee/settings/route.tsx",
      "parent": "/_base"
    }
  }
}
ROUTE_MANIFEST_END */
