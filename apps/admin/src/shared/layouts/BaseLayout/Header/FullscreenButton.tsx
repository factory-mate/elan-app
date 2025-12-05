import { useFullscreen } from 'ahooks'

export default function FullScreenButton() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)

  return (
    <Tooltip
      title={isFullscreen ? '退出全屏' : '全屏'}
      placement="bottom"
    >
      <div
        className="cursor-pointer text-lg"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? <LucideShrink /> : <LucideExpand />}
      </div>
    </Tooltip>
  )
}
