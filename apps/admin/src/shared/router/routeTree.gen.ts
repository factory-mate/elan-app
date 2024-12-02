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
import { Route as BaseDigitalModelingProductsUnitAddRouteImport } from './../../routes/_base/digital-modeling/products/unit/add/route'
import { Route as BaseDigitalModelingOrgsEmployeeSettingsRouteImport } from './../../routes/_base/digital-modeling/orgs/employee/settings/route'
import { Route as BaseDigitalModelingOrgsEmployeeAddRouteImport } from './../../routes/_base/digital-modeling/orgs/employee/add/route'
import { Route as BaseDigitalModelingProductsUnitIndexRouteImport } from './../../routes/_base/digital-modeling/products/unit/index/route'
import { Route as BaseDigitalModelingProductsUnitGroupIndexRouteImport } from './../../routes/_base/digital-modeling/products/unit-group/index/route'
import { Route as BaseDigitalModelingOrgsEmployeeIndexRouteImport } from './../../routes/_base/digital-modeling/orgs/employee/index/route'
import { Route as BaseDigitalModelingOrgsDepartmentIndexRouteImport } from './../../routes/_base/digital-modeling/orgs/department/index/route'
import { Route as BaseDigitalModelingMerchantsCustomerIndexRouteImport } from './../../routes/_base/digital-modeling/merchants/customer/index/route'
import { Route as BaseDigitalModelingMerchantsCustomerClassIndexRouteImport } from './../../routes/_base/digital-modeling/merchants/customer-class/index/route'
import { Route as BaseDigitalModelingProductsUnitIdEditRouteImport } from './../../routes/_base/digital-modeling/products/unit/$id/edit/route'
import { Route as BaseDigitalModelingProductsUnitIdDetailRouteImport } from './../../routes/_base/digital-modeling/products/unit/$id/detail/route'

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

const BaseDigitalModelingProductsUnitAddRouteRoute =
  BaseDigitalModelingProductsUnitAddRouteImport.update({
    id: '/digital-modeling/products/unit/add',
    path: '/digital-modeling/products/unit/add',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit/add/route.lazy'
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

const BaseDigitalModelingProductsUnitGroupIndexRouteRoute =
  BaseDigitalModelingProductsUnitGroupIndexRouteImport.update({
    id: '/digital-modeling/products/unit-group/',
    path: '/digital-modeling/products/unit-group/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit-group/index/route.lazy'
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

const BaseDigitalModelingProductsUnitIdEditRouteRoute =
  BaseDigitalModelingProductsUnitIdEditRouteImport.update({
    id: '/digital-modeling/products/unit/$id/edit',
    path: '/digital-modeling/products/unit/$id/edit',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit/$id/edit/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsUnitIdDetailRouteRoute =
  BaseDigitalModelingProductsUnitIdDetailRouteImport.update({
    id: '/digital-modeling/products/unit/$id/detail',
    path: '/digital-modeling/products/unit/$id/detail',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit/$id/detail/route.lazy'
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
    '/_base/digital-modeling/products/unit-group/': {
      id: '/_base/digital-modeling/products/unit-group/'
      path: '/digital-modeling/products/unit-group'
      fullPath: '/digital-modeling/products/unit-group'
      preLoaderRoute: typeof BaseDigitalModelingProductsUnitGroupIndexRouteImport
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
    '/_base/digital-modeling/products/unit/add': {
      id: '/_base/digital-modeling/products/unit/add'
      path: '/digital-modeling/products/unit/add'
      fullPath: '/digital-modeling/products/unit/add'
      preLoaderRoute: typeof BaseDigitalModelingProductsUnitAddRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/products/unit/$id/detail': {
      id: '/_base/digital-modeling/products/unit/$id/detail'
      path: '/digital-modeling/products/unit/$id/detail'
      fullPath: '/digital-modeling/products/unit/$id/detail'
      preLoaderRoute: typeof BaseDigitalModelingProductsUnitIdDetailRouteImport
      parentRoute: typeof BaseRouteImport
    }
    '/_base/digital-modeling/products/unit/$id/edit': {
      id: '/_base/digital-modeling/products/unit/$id/edit'
      path: '/digital-modeling/products/unit/$id/edit'
      fullPath: '/digital-modeling/products/unit/$id/edit'
      preLoaderRoute: typeof BaseDigitalModelingProductsUnitIdEditRouteImport
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
  BaseDigitalModelingMerchantsVendorRouteRoute: typeof BaseDigitalModelingMerchantsVendorRouteRoute
  BaseDigitalModelingMerchantsVendorClassRouteRoute: typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute: typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  BaseDigitalModelingMerchantsCustomerIndexRouteRoute: typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  BaseDigitalModelingOrgsDepartmentIndexRouteRoute: typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  BaseDigitalModelingOrgsEmployeeIndexRouteRoute: typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  BaseDigitalModelingProductsUnitGroupIndexRouteRoute: typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  BaseDigitalModelingProductsUnitIndexRouteRoute: typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  BaseDigitalModelingOrgsEmployeeAddRouteRoute: typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  BaseDigitalModelingOrgsEmployeeSettingsRouteRoute: typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
  BaseDigitalModelingProductsUnitAddRouteRoute: typeof BaseDigitalModelingProductsUnitAddRouteRoute
  BaseDigitalModelingProductsUnitIdDetailRouteRoute: typeof BaseDigitalModelingProductsUnitIdDetailRouteRoute
  BaseDigitalModelingProductsUnitIdEditRouteRoute: typeof BaseDigitalModelingProductsUnitIdEditRouteRoute
}

const BaseRouteRouteChildren: BaseRouteRouteChildren = {
  BaseIndexRouteRoute: BaseIndexRouteRoute,
  Base403RouteRoute: Base403RouteRoute,
  Base404RouteRoute: Base404RouteRoute,
  BaseChangePasswordRouteRoute: BaseChangePasswordRouteRoute,
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
  BaseDigitalModelingProductsUnitGroupIndexRouteRoute:
    BaseDigitalModelingProductsUnitGroupIndexRouteRoute,
  BaseDigitalModelingProductsUnitIndexRouteRoute:
    BaseDigitalModelingProductsUnitIndexRouteRoute,
  BaseDigitalModelingOrgsEmployeeAddRouteRoute:
    BaseDigitalModelingOrgsEmployeeAddRouteRoute,
  BaseDigitalModelingOrgsEmployeeSettingsRouteRoute:
    BaseDigitalModelingOrgsEmployeeSettingsRouteRoute,
  BaseDigitalModelingProductsUnitAddRouteRoute:
    BaseDigitalModelingProductsUnitAddRouteRoute,
  BaseDigitalModelingProductsUnitIdDetailRouteRoute:
    BaseDigitalModelingProductsUnitIdDetailRouteRoute,
  BaseDigitalModelingProductsUnitIdEditRouteRoute:
    BaseDigitalModelingProductsUnitIdEditRouteRoute,
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
  '/digital-modeling/merchants/vendor': typeof BaseDigitalModelingMerchantsVendorRouteRoute
  '/digital-modeling/merchants/vendor-class': typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  '/digital-modeling/merchants/customer-class': typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  '/digital-modeling/merchants/customer': typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  '/digital-modeling/orgs/department': typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  '/digital-modeling/orgs/employee': typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  '/digital-modeling/products/unit-group': typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  '/digital-modeling/products/unit': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  '/digital-modeling/orgs/employee/add': typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  '/digital-modeling/orgs/employee/settings': typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
  '/digital-modeling/products/unit/add': typeof BaseDigitalModelingProductsUnitAddRouteRoute
  '/digital-modeling/products/unit/$id/detail': typeof BaseDigitalModelingProductsUnitIdDetailRouteRoute
  '/digital-modeling/products/unit/$id/edit': typeof BaseDigitalModelingProductsUnitIdEditRouteRoute
}

export interface FileRoutesByTo {
  '/$': typeof SplatRouteRoute
  '': typeof PublicRouteRouteWithChildren
  '/': typeof BaseIndexRouteRoute
  '/403': typeof Base403RouteRoute
  '/404': typeof Base404RouteRoute
  '/change-password': typeof BaseChangePasswordRouteRoute
  '/login': typeof PublicLoginRouteRoute
  '/digital-modeling/merchants/vendor': typeof BaseDigitalModelingMerchantsVendorRouteRoute
  '/digital-modeling/merchants/vendor-class': typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  '/digital-modeling/merchants/customer-class': typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  '/digital-modeling/merchants/customer': typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  '/digital-modeling/orgs/department': typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  '/digital-modeling/orgs/employee': typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  '/digital-modeling/products/unit-group': typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  '/digital-modeling/products/unit': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  '/digital-modeling/orgs/employee/add': typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  '/digital-modeling/orgs/employee/settings': typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
  '/digital-modeling/products/unit/add': typeof BaseDigitalModelingProductsUnitAddRouteRoute
  '/digital-modeling/products/unit/$id/detail': typeof BaseDigitalModelingProductsUnitIdDetailRouteRoute
  '/digital-modeling/products/unit/$id/edit': typeof BaseDigitalModelingProductsUnitIdEditRouteRoute
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
  '/_base/digital-modeling/merchants/vendor': typeof BaseDigitalModelingMerchantsVendorRouteRoute
  '/_base/digital-modeling/merchants/vendor-class': typeof BaseDigitalModelingMerchantsVendorClassRouteRoute
  '/_base/digital-modeling/merchants/customer-class/': typeof BaseDigitalModelingMerchantsCustomerClassIndexRouteRoute
  '/_base/digital-modeling/merchants/customer/': typeof BaseDigitalModelingMerchantsCustomerIndexRouteRoute
  '/_base/digital-modeling/orgs/department/': typeof BaseDigitalModelingOrgsDepartmentIndexRouteRoute
  '/_base/digital-modeling/orgs/employee/': typeof BaseDigitalModelingOrgsEmployeeIndexRouteRoute
  '/_base/digital-modeling/products/unit-group/': typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  '/_base/digital-modeling/products/unit/': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  '/_base/digital-modeling/orgs/employee/add': typeof BaseDigitalModelingOrgsEmployeeAddRouteRoute
  '/_base/digital-modeling/orgs/employee/settings': typeof BaseDigitalModelingOrgsEmployeeSettingsRouteRoute
  '/_base/digital-modeling/products/unit/add': typeof BaseDigitalModelingProductsUnitAddRouteRoute
  '/_base/digital-modeling/products/unit/$id/detail': typeof BaseDigitalModelingProductsUnitIdDetailRouteRoute
  '/_base/digital-modeling/products/unit/$id/edit': typeof BaseDigitalModelingProductsUnitIdEditRouteRoute
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
    | '/digital-modeling/merchants/vendor'
    | '/digital-modeling/merchants/vendor-class'
    | '/digital-modeling/merchants/customer-class'
    | '/digital-modeling/merchants/customer'
    | '/digital-modeling/orgs/department'
    | '/digital-modeling/orgs/employee'
    | '/digital-modeling/products/unit-group'
    | '/digital-modeling/products/unit'
    | '/digital-modeling/orgs/employee/add'
    | '/digital-modeling/orgs/employee/settings'
    | '/digital-modeling/products/unit/add'
    | '/digital-modeling/products/unit/$id/detail'
    | '/digital-modeling/products/unit/$id/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/$'
    | ''
    | '/'
    | '/403'
    | '/404'
    | '/change-password'
    | '/login'
    | '/digital-modeling/merchants/vendor'
    | '/digital-modeling/merchants/vendor-class'
    | '/digital-modeling/merchants/customer-class'
    | '/digital-modeling/merchants/customer'
    | '/digital-modeling/orgs/department'
    | '/digital-modeling/orgs/employee'
    | '/digital-modeling/products/unit-group'
    | '/digital-modeling/products/unit'
    | '/digital-modeling/orgs/employee/add'
    | '/digital-modeling/orgs/employee/settings'
    | '/digital-modeling/products/unit/add'
    | '/digital-modeling/products/unit/$id/detail'
    | '/digital-modeling/products/unit/$id/edit'
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
    | '/_base/digital-modeling/merchants/vendor'
    | '/_base/digital-modeling/merchants/vendor-class'
    | '/_base/digital-modeling/merchants/customer-class/'
    | '/_base/digital-modeling/merchants/customer/'
    | '/_base/digital-modeling/orgs/department/'
    | '/_base/digital-modeling/orgs/employee/'
    | '/_base/digital-modeling/products/unit-group/'
    | '/_base/digital-modeling/products/unit/'
    | '/_base/digital-modeling/orgs/employee/add'
    | '/_base/digital-modeling/orgs/employee/settings'
    | '/_base/digital-modeling/products/unit/add'
    | '/_base/digital-modeling/products/unit/$id/detail'
    | '/_base/digital-modeling/products/unit/$id/edit'
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
        "/_base/digital-modeling/merchants/vendor",
        "/_base/digital-modeling/merchants/vendor-class",
        "/_base/digital-modeling/merchants/customer-class/",
        "/_base/digital-modeling/merchants/customer/",
        "/_base/digital-modeling/orgs/department/",
        "/_base/digital-modeling/orgs/employee/",
        "/_base/digital-modeling/products/unit-group/",
        "/_base/digital-modeling/products/unit/",
        "/_base/digital-modeling/orgs/employee/add",
        "/_base/digital-modeling/orgs/employee/settings",
        "/_base/digital-modeling/products/unit/add",
        "/_base/digital-modeling/products/unit/$id/detail",
        "/_base/digital-modeling/products/unit/$id/edit"
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
    "/_base/digital-modeling/products/unit-group/": {
      "filePath": "_base/digital-modeling/products/unit-group/index/route.tsx",
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
    },
    "/_base/digital-modeling/products/unit/add": {
      "filePath": "_base/digital-modeling/products/unit/add/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/unit/$id/detail": {
      "filePath": "_base/digital-modeling/products/unit/$id/detail/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/unit/$id/edit": {
      "filePath": "_base/digital-modeling/products/unit/$id/edit/route.tsx",
      "parent": "/_base"
    }
  }
}
ROUTE_MANIFEST_END */
