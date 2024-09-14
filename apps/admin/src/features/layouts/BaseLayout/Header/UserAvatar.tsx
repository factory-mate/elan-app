import type { MenuProps } from 'antd'

import { useLogoutMutation } from '@/features/auth'

enum UserAction {
  'USER.INFO' = '1',
  'CHANGE.PASSWORD' = '2',
  'QUIT' = '3'
}

export default function UserAvatar() {
  const router = useRouter()
  const navigate = useNavigate()

  const userStore = useUserStore()
  const logoutMutation = useLogoutMutation()

  const menuItems: MenuProps['items'] = [
    {
      key: UserAction['USER.INFO'],
      label: userStore.userInfo?.UserName,
      onMouseEnter: () => router.preloadRoute({ to: '/' })
    },
    {
      key: UserAction['CHANGE.PASSWORD'],
      label: '修改密码',
      onMouseEnter: () => router.preloadRoute({ to: '/change-password' })
    },
    {
      key: UserAction.QUIT,
      label: '退出登录',
      onMouseEnter: () => router.preloadRoute({ to: '/login' })
    }
  ]

  const handleClickMenu: MenuProps['onClick'] = async ({ key }) => {
    switch (key) {
      case UserAction['USER.INFO']: {
        navigate({ to: '/' })
        break
      }
      case UserAction['CHANGE.PASSWORD']: {
        navigate({ to: '/change-password' })
        break
      }
      case UserAction.QUIT: {
        logoutMutation.mutate()
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleClickMenu
      }}
    >
      <Avatar
        src={`https://api.dicebear.com/9.x/initials/svg?seed=${userStore.userInfo?.UserName}`}
        size={36}
        className="cursor-pointer hover:shadow"
      />
    </Dropdown>
  )
}
