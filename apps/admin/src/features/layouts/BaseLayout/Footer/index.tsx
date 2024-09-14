import { Image } from 'antd'

import logo from '@/assets/images/logo/factory_mate.jpg'

export default function Footer() {
  return (
    <Layout.Footer className="border-t border-gray-300 p-0 shadow-sm dark:border-gray-950">
      <div className="flex h-10 items-center justify-center space-x-2 overflow-hidden whitespace-nowrap text-sm">
        <Image
          className="-mb-2 cursor-pointer pb-2 transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
          src={logo}
          alt="Logo"
          loading="lazy"
          width={20}
          preview={false}
          draggable={false}
        />
        <span className="hidden sm:block">{appConfig.CONTACT_US}</span>
        <span>{appConfig.COPYRIGHT}</span>
      </div>
    </Layout.Footer>
  )
}
