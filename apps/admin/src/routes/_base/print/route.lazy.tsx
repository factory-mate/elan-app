import { useReactToPrint } from 'react-to-print'

import styles from './-styles/print.module.scss'

export const Route = createLazyFileRoute('/_base/print')({
  component: RouteComponent
})

function RouteComponent() {
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })
  const [showPrintContent, setShowPrintContent] = useState(true)

  const mockData = [
    {
      code: 'G00286',
      name: '香蕉香精',
      ratio: '50',
      num: '0.000456',
      actualNum: '300',
      checkCode: '6956'
    },
    {
      code: 'G00286',
      name: '香蕉香精2',
      ratio: '50',
      num: '0.000456',
      actualNum: '300',
      checkCode: '6956'
    },
    {
      code: 'G00286',
      name: '香蕉香精3',
      ratio: '50',
      num: '0.000456',
      actualNum: '300',
      checkCode: '6956'
    }
  ]
  return (
    <div>
      <Space>
        <Button onClick={() => reactToPrintFn()}>打印</Button>
        <Button onClick={() => setShowPrintContent((x) => !x)}>
          {showPrintContent ? '隐藏打印内容' : '显示打印内容'}
        </Button>
      </Space>

      <div className={clsx('mt-4', showPrintContent && 'border')}>
        <div
          ref={contentRef}
          className={showPrintContent ? undefined : styles.printContent}
        >
          <div className="relative h-screen p-8">
            <div className="flex items-center justify-between">
              <div />
              <div className="text-2xl">Elan 配方投产单</div>
              <div className="right-0">批号：6956</div>
            </div>
            <div className="mt-4 border-b-2 border-black text-lg">
              <div className="grid grid-cols-4">
                <div>编号：FA-04901</div>
                <div>名称：香蕉香精</div>
                <div>确认状态：已确认</div>
                <div>2025-03-04</div>
              </div>
            </div>

            <div className="mt-2 border-b border-black text-lg">
              <div className="grid grid-cols-6">
                <div>编号</div>
                <div>名称</div>
                <div>配比</div>
                <div>用量（公斤）</div>
                <div>实际投料</div>
                <div>验单号</div>
              </div>
            </div>

            {mockData.map((item, index) => (
              <div
                className="mt-2 border-b border-black text-lg"
                key={index}
              >
                <div className="grid grid-cols-6">
                  <div>{item.code}</div>
                  <div>{item.name}</div>
                  <div>{item.ratio}</div>
                  <div>{item.num}</div>
                  <div>{item.actualNum}</div>
                  <div>{item.checkCode}</div>
                </div>
              </div>
            ))}

            <div className="mt-2 flex justify-end space-x-12">
              <div>总配比（%）：100%</div>
              <div>总用量（公斤）：40044</div>
            </div>

            <div className="absolute inset-x-0 bottom-0 m-auto w-full px-8 pb-8">
              <div className="flex w-full justify-between border-t border-black pt-2 text-sm">
                <div className={styles.textUnderline}>签发：</div>
                <div className={styles.textUnderline}>生产：</div>
                <div className={styles.textUnderline}>核对：</div>
                <div className={styles.textUnderline}>库存管理：</div>
                <div className={styles.textUnderline}>生产日期：</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
