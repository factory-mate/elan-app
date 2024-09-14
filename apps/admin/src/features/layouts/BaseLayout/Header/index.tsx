import FullscreenButton from './FullscreenButton'
import MenuVisibilityToggle from './MenuVisibilityToggle'
import UserAvatar from './UserAvatar'

export default function Header() {
  return (
    <Layout.Header
      className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-gray-300 p-2 shadow-sm sm:p-4 dark:border-gray-950"
      style={{
        padding: '0 15px'
      }}
    >
      <Flex
        align="center"
        justify="start"
        gap={16}
      >
        <MenuVisibilityToggle />
      </Flex>

      <Flex
        align="center"
        gap={8}
      >
        <Flex
          align="center"
          justify="start"
          gap={20}
        >
          <FullscreenButton />
        </Flex>

        <Divider type="vertical" />

        <UserAvatar />
      </Flex>
    </Layout.Header>
  )
}
