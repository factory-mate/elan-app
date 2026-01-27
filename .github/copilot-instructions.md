# ELAN App - AI Coding Agent Instructions

## Project Overview

**Factory Mate ELAN** is a monorepo MES (Manufacturing Execution System) management web application built with **React 18**, **Nx**, **TypeScript**, and **TanStack Router**. The primary app (`admin`) manages BOMs, production orders, inventory, and manufacturing workflows.

**Tech Stack**: React 18 + Vite + TanStack Router + React Query + Zustand + Ant Design + AG Grid

---

## Monorepo Architecture

### Structure

- **apps/admin** - Main MES web application
- **apps/mobile** - Mobile application (structure exists, still developing)
- **packages/config** - Shared configuration package (`@elan/config`)
- **packages/cspell** - Spell-checking configuration

### Key Technologies

- **Nx 22.4.2** - Monorepo orchestration with cached builds
- **pnpm workspaces** - Package management
- **TanStack Router** - File-based routing with type safety (auto-generates `routeTree.gen.ts`)
- **React Query 5.9** - Server state management with `queryOptions` pattern
- **Zustand** - Client state management (persisted stores)

---

## Data Flow & Architecture Patterns

### API Layer (Features Pattern)

Each domain feature (e.g., `bom`, `production-order`, `inventory`) follows this structure:

```
src/features/{feature}/
├── api.ts           # API class with static methods (e.g., BOMAPI.tree())
├── types.ts         # TypeScript interfaces/DTOs
├── queries.ts       # React Query queryOptions (getters, lists, details)
├── mutations.ts     # React Query mutations (add, edit, delete)
├── query-keys.ts    # Query key factory (for invalidation/caching)
├── constants.ts     # Feature-specific constants
├── enums.ts         # Enumerations
├── utils.ts         # Utility functions
└── index.ts         # Barrel export
```

**Example**: BOM feature uses `BOMAPI.tree()`, `BOMAPI.list()`, and wrapped mutations like `useAddMutation()`.

### HTTP Client

- **Location**: `src/shared/axios/http-client.ts`
- **Usage**: `httpClient.get/post/put/delete<T>()` with typed responses
- **Request/Response Interceptors**: Initialized via `AxiosProvider` after router setup
- **API Prefixes**: Two configured endpoints:
  - `VITE_MANAGE_CENTER_API_PREFIX` (legacy systems)
  - `VITE_MES_SERVICE_API_PREFIX` (new MES services)

### State Management

**Zustand Stores** (auto-imported, located in `src/shared/store/`):

- `useUserStore` - User authentication info (persisted)
- `usePermStore` - User permissions with `hasCode()` check
- `useThemeStore` - Theme preferences
- `useSidebarStore` - Navigation sidebar state
- `useTabbarStore` - Tab bar state

---

## Routing & Access Control

### TanStack Router Setup

- Routes defined in `src/routes/` (file-based, auto-generates `routeTree.gen.ts`)
- Root route: `__root.tsx` (loads devtools in DEV mode)
- Layout routes: `_base.tsx` (authenticated), `_public.tsx` (public login)

### Permission System

1. **beforeLoad** in routes validates auth + permissions
2. Routes declare `permCode` metadata (single string or array)
3. `usePermStore.getState().hasCode()` checks user access
4. Failed auth → redirect to `/login` with redirect URL
5. Failed permission → redirect to `/403`

**Example**: Define `permCode: ['BOM_VIEW', 'BOM_EDIT']` in route options

---

## Shared Infrastructure

### Auto-Imported Modules

Via Vite unplugin-auto-import configuration (no explicit imports needed):

- React hooks, React Query hooks
- Components from `src/shared/components/**`
- Utils, hooks, stores, types from `src/shared/**`
- Custom icons via `unplugin-icons` (prefix-less JSX icons)

### Query Client

- Pre-configured in `src/shared/query-client/`
- Auto-imported in provider
- Supports `queryClient.ensureQueryData()` for loaders

### Providers Stack

```tsx
<QueryProvider>
  <AntdProvider>
    <AxiosProvider>
      <RouterProvider router={router} />
    </AxiosProvider>
  </AntdProvider>
</QueryProvider>
```

---

## Critical Developer Workflows

### Build & Development

```bash
# Build all packages/apps
pnpm nx run-many -t build -p @elan/* --parallel=10

# Development server (admin app default port 5070)
cd apps/admin && pnpm dev

# Type checking, linting, formatting
pnpm type:check           # TypeScript check all
pnpm eslint:check/fix     # ESLint all
pnpm prettier:check/fix   # Prettier all
pnpm cspell:check         # Spell check all
pnpm lint:check           # Run all checks
```

### Code Quality

- **ESLint Config**: Extends `@bit-ocean/eslint-config/typescript`
- **Prettier Config**: Uses `@bit-ocean/prettier-config`
- **CSpell Config**: Custom dictionary in `packages/cspell/dicts/elan.txt`
- **Commit Pattern**: Conventional Commits via `cz-git` (required for commit-lint)

### Git Hooks

- **husky** pre-commit hooks run `lint-staged`
- **commitlint** validates conventional commits

---

## Project-Specific Patterns & Conventions

### Feature-to-Component Binding

1. Components call `useQuery(XXX_QO(...))` directly with queryOptions
2. Keep data fetching logic in features, UI logic in components
3. Mutations auto-invalidate related queries via `queryClient.invalidateQueries()`

### Type Safety

- Path alias: `@/` → `src/` (defined in tsconfig.json)
- Extend types with `Vo` (value objects), `Dto` (data transfer objects), `Page<T>` (paginated responses)
- HTTP responses strongly typed: `httpClient.get<BOMVo[]>()`

### Pagination Pattern

- `PageDto` (current page, page size, filters) → `Page<T>` response
- Wrapped in `queryOptions` with `placeholderData: keepPreviousData`
- Custom hook: `usePagination()` for table controls

### Message Notifications

- Custom hook: `useMessage()` returns `showMessage(type, message)`
- Integrated in mutations' `onSuccess`/`onError` callbacks
- Ant Design's `App.useApp()` message context is injected globally

### Responsive UI

- Ant Design Grid system (col, row)
- Custom hook: `useResponsiveColSpan()` for responsive column spans
- Tailwind CSS configured in tailwind.config.js

---

## Integration Points & External Dependencies

### Backend Services

- **Manage Center API** (legacy) - User, roles, permissions
- **MES Service API** (new) - BOM, production orders, inventory

### Third-Party Libraries

- **AG Grid** - Enterprise tables (ag-grid-react, ag-grid-enterprise)
- **ECharts** - Data visualization (via @bit-ocean/echarts)
- **Ant Design 6** - UI components with happy-work-theme
- **TanStack Stack** - Router (v1.157) + Query (v5.90)
- **Bit Ocean** - Internal design system, utilities, hooks, themes

### Environment Variables

Set in `.env` files (loaded by Vite):

- `VITE_PORT` - Dev server port
- `VITE_MANAGE_CENTER_API_URL` - Backend URL
- `VITE_MES_SERVICE_API_PREFIX/URL` - MES service endpoints

---

## Common Tasks & Solutions

### Adding a New Feature Module

1. Create `src/features/{feature-name}/` folder
2. Implement: `api.ts` → `types.ts` → `query-keys.ts` → `queries.ts` → `mutations.ts` → `index.ts`
3. Create routes in `src/routes/_base/{feature}/` with permission codes
4. Feature hooks auto-exported, no manual imports needed

### Fetching Data in Components

```tsx
// Auto-imported React Query hooks
const { data, isLoading } = useQuery(bomListQO({ page: 1 }))
```

### Invalidating Queries After Mutation

```tsx
const { mutate } = useMutation({
  mutationFn: BOMAPI.add,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: listQK() })
    showMessage('success')
  }
})
```

### Checking User Permissions

```tsx
const hasAccess = usePermStore((s) => s.hasCode('BOM_EDIT'))
```

### File-Based Routing

- Routes auto-generated from `src/routes/**` structure
- Use `_` prefix to indicate layout groups
- Use `$` for dynamic segments
- File name reflects route path (e.g., `_base/bom/index.tsx` → `/bom`)

---

## Common Pitfalls & Notes

1. **Initialization Order**: Axios interceptors initialized in `AxiosProvider` after router context available
2. **Query Caching**: Always use `queryKey()` factory functions for consistency and invalidation
3. **Persisted State**: Zustand stores use `persist` middleware; clear storage if schema changes
4. **Type Checking**: Run `pnpm type:check` before commits; CI enforces this
5. **Route Metadata**: Permissions in `Route` options; not enforced at component level
6. **Immer Config**: Auto-imported stores use `enableMapSet()` and `setAutoFreeze(false)` for performance

---

## File References

**Key Architecture Files**:

- [src/apps/index.tsx](../apps/admin/src/apps/index.tsx) - Provider setup
- [src/routes/\_\_root.tsx](../apps/admin/src/routes/__root.tsx) - Root route with devtools
- [src/routes/\_base.tsx](../apps/admin/src/routes/_base.tsx) - Auth/permission guard
- [src/shared/axios/http-client.ts](../apps/admin/src/shared/axios/http-client.ts) - HTTP client
- [src/features/bom/](../apps/admin/src/features/bom/) - Example feature module

**Configuration Files**:

- [vite.config.ts](../apps/admin/vite.config.ts) - Vite + auto-import setup
- [tsconfig.json](../apps/admin/tsconfig.json) - TypeScript paths alias
- [tsr.config.json](../apps/admin/tsr.config.json) - TanStack Router auto-generation
