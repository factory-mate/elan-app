import type { PropsWithChildren } from 'react'

interface PageContainerProps extends PropsWithChildren {}

export default function PageContainer(props: PageContainerProps) {
  const { children } = props

  return (
    <Flex
      vertical
      gap={8}
    >
      {children}
    </Flex>
  )
}
