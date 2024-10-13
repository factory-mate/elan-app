import { lowCodeConfigQO } from './queries'

export async function loadRouteConfig(modelCode?: string) {
  if (!modelCode) {
    throw new Error('缺少布局配置')
  }
  const config = await queryClient.ensureQueryData(lowCodeConfigQO(modelCode))
  return config
}
