export default function MenuVisibilityToggle() {
  const sidebarStore = useSidebarStore()

  return (
    <Tooltip
      title={sidebarStore.isDisplay ? '收起菜单' : '展开菜单'}
      placement="bottom"
    >
      <div
        onClick={sidebarStore.toggleDisplay}
        className="cursor-pointer text-lg"
      >
        {sidebarStore.isDisplay ? <LineMdMenuFoldLeft /> : <LineMdMenuFoldRight />}
      </div>
    </Tooltip>
  )
}
