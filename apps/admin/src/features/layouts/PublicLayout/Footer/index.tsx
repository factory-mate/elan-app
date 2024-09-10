import { appConfig } from '@elan/config'
import { Image } from 'antd'

import logo from '@/assets/images/logo/factory_mate.jpg'

export default function Footer() {
  return (
    <div className="absolute bottom-0 w-full p-0">
      <div className="flex h-10 flex-col items-center justify-center text-sm sm:flex-row sm:space-x-2">
        <div className="flex justify-center space-x-1 sm:space-x-2">
          <Image
            className="-mb-2 cursor-pointer pb-2 transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
            src={logo}
            alt="Logo"
            loading="lazy"
            width={20}
            preview={false}
            draggable={false}
          />
          <span>{appConfig.CONTACT_US}</span>
        </div>
        <span>{appConfig.COPYRIGHT}</span>
      </div>
    </div>
  )
}
