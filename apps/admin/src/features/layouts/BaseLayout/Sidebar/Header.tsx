import { Image } from 'antd'

import logo from '@/assets/images/logo/factory_mate.jpg'

export default function Header() {
  const router = useRouter()
  const navigate = useNavigate()

  const sidebarStore = useSidebarStore()

  const navToHome = () => navigate({ to: '/' })

  return (
    <Link
      to="/"
      className="!text-inherit"
    >
      <div
        className="flex h-14 w-full select-none items-center justify-center space-x-2.5"
        onMouseEnter={() => router.preloadRoute({ to: '/' })}
        onClick={navToHome}
      >
        <Image
          className="cursor-pointer rounded-md shadow-sm"
          src={logo}
          alt="Logo"
          width={32}
          loading="eager"
          preview={false}
          draggable={false}
        />
        <span
          className={clsx([
            'cursor-pointer whitespace-nowrap text-lg transition-[margin,width]',
            sidebarStore.isDisplay && sidebarStore.isCollapse ? 'ml-0 hidden' : 'ml-1 w-auto',
            !sidebarStore.isDisplay && 'hidden'
          ])}
        >
          {appConfig.APP_NAME}
        </span>
      </div>
    </Link>
  )
}
