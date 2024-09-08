import type { PropsWithChildren } from 'react'

import Footer from './Footer'
import Transition from './Transition'

export default function PublicLayout(props: PropsWithChildren) {
  const { children } = props

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#eceff4]">
      <Transition>{children}</Transition>
      <Footer />
    </div>
  )
}
