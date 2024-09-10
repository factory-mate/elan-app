import loginBg from '@/assets/images/background/login.jpg'

export default function Banner() {
  return (
    <div className="w-0 overflow-hidden sm:w-1/2">
      <img
        className="hidden size-full cursor-pointer overflow-hidden object-cover transition-all duration-300 hover:scale-125 sm:block"
        src={loginBg}
        alt="登录背景图"
      />
    </div>
  )
}
