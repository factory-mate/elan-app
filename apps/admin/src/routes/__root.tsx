import type { QueryClient } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Suspense } from 'react'

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((res) => ({
    default: res.ReactQueryDevtools
  }))
)

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Root,
  notFoundComponent: NotFoundComponent
})

function Root() {
  useTitle()

  const [showDevtools, setShowDevtools] = useState(import.meta.env.DEV)

  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((v) => !v)
  }, [])

  return (
    <>
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
      <Suspense fallback={null}>
        {showDevtools && (
          <>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </>
        )}
      </Suspense>
    </>
  )
}

function NotFoundComponent() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  )
}
