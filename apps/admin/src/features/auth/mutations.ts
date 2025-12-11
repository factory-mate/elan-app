import { AuthAPI } from './api'
import type { LoginDto, LoginFormValues } from './types'

export const useLoginMutation = () => {
  const router = useRouter()
  const search = useSearch({
    from: '/_public/login'
  })
  const userStore = useUserStore()

  return useMutation({
    mutationFn: (loginDto: LoginDto) =>
      AuthAPI.login({
        ...loginDto,
        cSourceAppType: '001'
      }),
    onSuccess: async (data, variables: LoginFormValues) => {
      const { token, token_user: userInfo } = data
      userStore.setUserInfo(userInfo)
      AuthUtils.setAccessToken(token)

      router.navigate({
        to: search ? search.redirect : '/',
        replace: true
      })

      // Process remember account
      const { remember, ...loginDto } = variables
      if (remember) {
        AuthUtils.setRememberedAccount(JSON.stringify(loginDto))
      } else {
        AuthUtils.clearRememberedAccount()
      }
    }
  })
}

export const useLogoutMutation = () => {
  const router = useRouter()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const userStore = useUserStore()
  const permStore = usePermStore()

  return useMutation({
    mutationFn: () => AuthAPI.logout(),
    onSuccess: async () => {
      AuthUtils.clearAccessToken()
      // AuthUtils.clearRememberedAccount()
      message.success('登出成功')
      await navigate({ to: '/login', replace: true })
      userStore.setUserInfo(null)
      permStore.setCodes(new Set())
      queryClient.clear()
      router.history.flush()
    }
  })
}
