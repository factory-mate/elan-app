import logo from '@/assets/images/logo/factory_mate.jpg'

export default function Logo() {
  return (
    <Flex
      className="text-3xl"
      align="center"
      justify="center"
      gap={20}
    >
      <img
        className="rounded-md"
        src={logo}
        alt="Logo"
        width={60}
        height={60}
      />
      <Flex
        vertical
        align="center"
      >
        <span>{appConfig.APP_NAME}</span>
        <span className="text-xl">{appConfig.APP_NAME_EN}</span>
      </Flex>
    </Flex>
  )
}
