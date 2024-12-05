export const Route = createLazyFileRoute('/_base/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="mb-20 flex w-full flex-col items-center justify-center space-y-4 bg-[#f0f2f5] py-10">
        <span className="text-2xl font-semibold">慧友天工</span>
        <span className="text-lg">数字企业 智能运营</span>
      </div>
    </div>
  )
}
