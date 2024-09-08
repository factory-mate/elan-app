/**
 * 动态修改 `Document.title`
 */
export const useTitle = () => {
  const routeStaticData = useRouteStaticData()

  useEffect(() => {
    const { title } = routeStaticData
    document.title = title ? `${title} | ${appConfig.APP_NAME}` : appConfig.APP_NAME
  }, [routeStaticData])
}
