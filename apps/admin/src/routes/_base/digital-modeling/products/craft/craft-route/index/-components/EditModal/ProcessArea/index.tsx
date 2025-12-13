import type { Updater } from 'use-immer'

import type { CraftRouteProcessVo } from '@/features/craft-route'

import ProcessModal, { type ProcessModalProps } from './ProcessModal'
import StepModal from './StepModal'

interface ResourceResourceProps {
  data: CraftRouteProcessVo[]
  setData: Updater<CraftRouteProcessVo[]>
}
export default function ProcessArea(props: ResourceResourceProps) {
  const { data, setData } = props

  const { message } = App.useApp()

  const processModal = useModal<ProcessModalProps['meta']>()
  const stepModal = useModal<ProcessModalProps['meta']>()

  const [currentProcess, setCurrentProcess] = useState(-1)
  const [currentStep, setCurrentStep] = useState(-1)

  const processItems = useMemo(
    () =>
      data.map((i) => ({
        title: i.cProcessName,
        content: (
          <Space
            vertical
            className="text-xs"
          >
            {i.bMain && (
              <span>
                <Tag color="green">关键工序</Tag>
              </span>
            )}
            <div>准备时间：{i.dReadyTime ? `${i.dReadyTime}分钟` : '-'}</div>
            <div>等待时间：{i.dWaitTime ? `${i.dWaitTime}分钟` : '-'}</div>
          </Space>
        ),
        subTitle: i.cProcessCode,
        ...i
      })),
    [data]
  )

  const stepItems = useMemo(
    () =>
      (data[currentProcess]?.list_step ?? []).map((i) => ({
        title: i.cStepName,
        subTitle: i.cStepCode,
        ...i
      })),
    [currentProcess, data]
  )

  useEffect(() => {
    setCurrentStep(-1)
  }, [currentProcess])

  return (
    <div className="h-[540px]">
      <Row className="h-full">
        <Col span={11}>
          <Flex justify="end">
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  processModal.setType('add')
                  processModal.setMeta({})
                  processModal.toggle()
                }}
              >
                新增工序
              </Button>
              <Button
                disabled={currentProcess < 0}
                onClick={() => {
                  processModal.setType('edit')
                  processModal.setMeta({
                    ...processItems[currentProcess]
                  })
                  processModal.toggle()
                }}
              >
                编辑工序
              </Button>
              <Popconfirm
                title="确认执行该操作？"
                onConfirm={() => {
                  if (stepItems.length > 0) {
                    message.warning('该工序下存在工步，请先删除工步数据')
                    return
                  }
                  setData((draft) => {
                    draft.splice(currentProcess!, 1)
                  })
                  setCurrentProcess(-1)
                }}
              >
                <Button disabled={currentProcess < 0}>删除工序</Button>
              </Popconfirm>
            </Space>
          </Flex>
          <Steps
            className="max-h-[500px] overflow-y-auto p-4"
            current={currentProcess}
            orientation="vertical"
            onChange={(c) => setCurrentProcess(c)}
            items={processItems}
          />
        </Col>

        <Col span={2}>
          <Divider
            orientation="vertical"
            variant="dashed"
            className="h-full"
          />
        </Col>

        <Col span={11}>
          <Flex justify="end">
            <Space>
              <Button
                type="primary"
                disabled={currentProcess < 0}
                onClick={() => {
                  stepModal.setType('add')
                  stepModal.setMeta({})
                  stepModal.toggle()
                }}
              >
                新增工步
              </Button>
              <Button
                disabled={currentStep < 0}
                onClick={() => {
                  stepModal.setType('edit')
                  stepModal.setMeta({
                    ...stepItems[currentStep]
                  })
                  stepModal.toggle()
                }}
              >
                编辑工步
              </Button>
              <Popconfirm
                title="确认执行该操作？"
                onConfirm={() => {
                  setData((draft) => {
                    draft[currentProcess].list_step!.splice(currentStep!, 1)
                  })
                  setCurrentStep(-1)
                }}
              >
                <Button disabled={currentStep < 0}>删除工步</Button>
              </Popconfirm>
            </Space>
          </Flex>
          <Steps
            className="max-h-[500px] overflow-y-auto p-4"
            current={currentStep}
            orientation="vertical"
            onChange={(c) => setCurrentStep(c)}
            items={stepItems}
          />
        </Col>
      </Row>
      <ProcessModal
        open={processModal.open}
        setOpen={processModal.setOpen}
        meta={processModal.meta}
        type={processModal.type}
        setData={setData}
        currentProcess={currentProcess}
      />
      <StepModal
        open={stepModal.open}
        setOpen={stepModal.setOpen}
        meta={stepModal.meta}
        type={stepModal.type}
        setData={setData}
        currentProcess={currentProcess}
        currentStep={currentStep}
      />
    </div>
  )
}
