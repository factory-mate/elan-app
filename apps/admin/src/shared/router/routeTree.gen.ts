/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

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
import { Route as BaseDigitalModelingProductsUnitAddRouteImport } from './../../routes/_base/digital-modeling/products/unit/add/route'
import { Route as BaseDigitalModelingProductsUnitIndexRouteImport } from './../../routes/_base/digital-modeling/products/unit/index/route'
import { Route as BaseDigitalModelingProductsUnitGroupIndexRouteImport } from './../../routes/_base/digital-modeling/products/unit-group/index/route'
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
  path: '/$',
  getParentRoute: () => rootRoute,
} as any)

const PublicLoginRouteRoute = PublicLoginRouteImport.update({
  path: '/login',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_public/login/route.lazy').then((d) => d.Route),
)

const BaseChangePasswordRouteRoute = BaseChangePasswordRouteImport.update({
  path: '/change-password',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/change-password/route.lazy').then(
    (d) => d.Route,
  ),
)

const Base404RouteRoute = Base404RouteImport.update({
  path: '/404',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/404/route.lazy').then((d) => d.Route),
)

const Base403RouteRoute = Base403RouteImport.update({
  path: '/403',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/403/route.lazy').then((d) => d.Route),
)

const BaseIndexRouteRoute = BaseIndexRouteImport.update({
  path: '/',
  getParentRoute: () => BaseRouteRoute,
} as any).lazy(() =>
  import('./../../routes/_base/index/route.lazy').then((d) => d.Route),
)

const BaseDigitalModelingProductsUnitAddRouteRoute =
  BaseDigitalModelingProductsUnitAddRouteImport.update({
    path: '/digital-modeling/products/unit/add',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit/add/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsUnitIndexRouteRoute =
  BaseDigitalModelingProductsUnitIndexRouteImport.update({
    path: '/digital-modeling/products/unit/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsUnitGroupIndexRouteRoute =
  BaseDigitalModelingProductsUnitGroupIndexRouteImport.update({
    path: '/digital-modeling/products/unit-group/',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit-group/index/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsUnitIdEditRouteRoute =
  BaseDigitalModelingProductsUnitIdEditRouteImport.update({
    path: '/digital-modeling/products/unit/$id/edit',
    getParentRoute: () => BaseRouteRoute,
  } as any).lazy(() =>
    import(
      './../../routes/_base/digital-modeling/products/unit/$id/edit/route.lazy'
    ).then((d) => d.Route),
  )

const BaseDigitalModelingProductsUnitIdDetailRouteRoute =
  BaseDigitalModelingProductsUnitIdDetailRouteImport.update({
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
  BaseDigitalModelingProductsUnitGroupIndexRouteRoute: typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  BaseDigitalModelingProductsUnitIndexRouteRoute: typeof BaseDigitalModelingProductsUnitIndexRouteRoute
  BaseDigitalModelingProductsUnitAddRouteRoute: typeof BaseDigitalModelingProductsUnitAddRouteRoute
  BaseDigitalModelingProductsUnitIdDetailRouteRoute: typeof BaseDigitalModelingProductsUnitIdDetailRouteRoute
  BaseDigitalModelingProductsUnitIdEditRouteRoute: typeof BaseDigitalModelingProductsUnitIdEditRouteRoute
}

const BaseRouteRouteChildren: BaseRouteRouteChildren = {
  BaseIndexRouteRoute: BaseIndexRouteRoute,
  Base403RouteRoute: Base403RouteRoute,
  Base404RouteRoute: Base404RouteRoute,
  BaseChangePasswordRouteRoute: BaseChangePasswordRouteRoute,
  BaseDigitalModelingProductsUnitGroupIndexRouteRoute:
    BaseDigitalModelingProductsUnitGroupIndexRouteRoute,
  BaseDigitalModelingProductsUnitIndexRouteRoute:
    BaseDigitalModelingProductsUnitIndexRouteRoute,
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
  '/digital-modeling/products/unit-group': typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  '/digital-modeling/products/unit': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
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
  '/digital-modeling/products/unit-group': typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  '/digital-modeling/products/unit': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
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
  '/_base/digital-modeling/products/unit-group/': typeof BaseDigitalModelingProductsUnitGroupIndexRouteRoute
  '/_base/digital-modeling/products/unit/': typeof BaseDigitalModelingProductsUnitIndexRouteRoute
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
    | '/digital-modeling/products/unit-group'
    | '/digital-modeling/products/unit'
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
    | '/digital-modeling/products/unit-group'
    | '/digital-modeling/products/unit'
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
    | '/_base/digital-modeling/products/unit-group/'
    | '/_base/digital-modeling/products/unit/'
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

/* prettier-ignore-end */

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
        "/_base/digital-modeling/products/unit-group/",
        "/_base/digital-modeling/products/unit/",
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
    "/_base/digital-modeling/products/unit-group/": {
      "filePath": "_base/digital-modeling/products/unit-group/index/route.tsx",
      "parent": "/_base"
    },
    "/_base/digital-modeling/products/unit/": {
      "filePath": "_base/digital-modeling/products/unit/index/route.tsx",
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
