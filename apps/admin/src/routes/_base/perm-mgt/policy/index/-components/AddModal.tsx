import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Dicts from '@/features/dicts'
import {
  authListQO,
  type PolicyAddDto,
  type PolicyDetailVo,
  useAddMutation
} from '@/features/policy'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<PolicyAddDto>()
  const { message, showMessage } = useMessage()
  const authModal = useModal()
  const policyTypeCode = Form.useWatch<string>('cPolicyTypeCode', form)

  const gridRef = useRef<AgGridReact>(null)
  const authGridRef = useRef<AgGridReact>(null)

  const { data: policyTypeCodeCandidates } = useQuery(
    Dicts.dicTypeQO({
      cTableCode: 'SYS_AUTHPOLICY',
      cAttributeCode: 'cPolicyTypeCode'
    })
  )
  const { data: authListData } = useQuery(
    authListQO({
      val: policyTypeCode
    })
  )

  const addMutation = useAddMutation()

  const columnDefs = useMemo<ColDef<PolicyDetailVo>[]>(
    () => [
      buildIndexColDef(),
      { field: 'cAuthCode', headerName: '授权码', flex: 1 },
      { field: 'cAuthName', headerName: '权限名称', flex: 1 },
      {
        headerName: '操作',
        width: 120,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<PolicyDetailVo>) => (
          <Button
            size="small"
            color="primary"
            variant="text"
            onClick={() => {
              if (params.data) {
                params.api.applyTransaction({
                  remove: [params.data]
                })
              }
            }}
          >
            删除
          </Button>
        )
      }
    ],
    []
  )

  const authColumnDefs = useMemo<ColDef<PolicyDetailVo>[]>(
    () => [
      { field: 'cAuthCode', headerName: '授权码', flex: 1 },
      { field: 'cAuthName', headerName: '权限名称', flex: 1 }
    ],
    []
  )

  const onFinish: FormProps<PolicyAddDto>['onFinish'] = (values) => {
    const rowData: PolicyDetailVo[] = []
    gridRef.current!.api.forEachNode((node) => rowData.push(node.data))
    addMutation.mutate(
      {
        ...values,
        models: rowData
      },
      {
        onSuccess: () => {
          setOpen?.(false)
          gridRef.current!.api.deselectAll()
          gridRef.current!.api.setGridOption('rowData', [])
          form.resetFields()
        }
      }
    )
  }

  return (
    <>
      <Modal
        title="新增策略"
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen?.(false)}
        forceRender
        width="80%"
        style={{ top: 20 }}
      >
        <Flex
          className="h-[calc(100vh-153px)]"
          vertical
          gap={8}
        >
          <Form
            className="pt-3"
            name="add-form"
            form={form}
            labelCol={{ span: 8 }}
            initialValues={{}}
            onFinish={onFinish}
          >
            <Row>
              <Col span={8}>
                <Form.Item<PolicyAddDto>
                  name="cPolicyName"
                  label="策略名称"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item<PolicyAddDto>
                  name="cPolicyTypeCode"
                  label="策略类型"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={policyTypeCodeCandidates}
                    fieldNames={{
                      label: 'cDictonaryName',
                      value: 'cDictonaryCode'
                    }}
                    allowClear
                    onChange={() => gridRef.current!.api.setGridOption('rowData', [])}
                  />
                </Form.Item>
              </Col>
              <Col span={8} />
              <Col span={8}>
                <Form.Item<PolicyAddDto>
                  name="IsContain"
                  label="是否包含"
                >
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item<PolicyAddDto>
                  name="IsThis"
                  label="是否本人策略"
                >
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                  />
                </Form.Item>
              </Col>
              <Col span={8} />
              <Col span={8}>
                <Form.Item<PolicyAddDto>
                  name="cMemo"
                  label="备注"
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Flex
            className="h-8"
            justify="space-between"
            align="center"
          >
            <Popconfirm
              title="确认执行该操作？"
              onConfirm={() => {
                const selectedRows = gridRef.current!.api.getSelectedRows()
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                gridRef.current!.api.applyTransaction({ remove: selectedRows })
                gridRef.current!.api.deselectAll()
              }}
            >
              <Button>删除</Button>
            </Popconfirm>
            <Button
              type="primary"
              onClick={() => {
                if (!form.getFieldValue('cPolicyTypeCode')) {
                  message.warning('请先选择策略类型')
                  return
                }
                authGridRef.current!.api.deselectAll()
                authModal.toggle()
              }}
            >
              新增
            </Button>
          </Flex>

          <div className="ag-theme-quartz flex-1">
            <AgGridReact<PolicyDetailVo>
              ref={gridRef}
              columnDefs={columnDefs}
              rowSelection={{
                mode: 'multiRow'
              }}
              selectionColumnDef={{
                sortable: true,
                suppressHeaderMenuButton: true,
                pinned: 'left',
                lockPinned: true
              }}
              onGridReady={() => gridRef.current!.api.setGridOption('rowData', [])}
            />
          </div>
        </Flex>
      </Modal>
      <Modal
        title="新增权限"
        open={authModal.open}
        onOk={() => {
          const selectedRows = authGridRef.current!.api.getSelectedRows()
          if (!selectedRows.length) {
            showMessage('select-data')
            return
          }
          const existingCodes = new Set<string>()
          const rowData: PolicyDetailVo[] = []
          gridRef.current!.api.forEachNode((node) => {
            rowData.push(node.data)
            existingCodes.add(node.data.cAuthCode)
          })
          const existingCodeMap = new Map<string, boolean>()
          rowData.forEach((i) => {
            existingCodeMap.set(i.cAuthCode, true)
          })
          const nonConflictingRows = selectedRows.filter((row) => !existingCodes.has(row.cAuthCode))
          gridRef.current!.api.setGridOption('rowData', [...rowData, ...nonConflictingRows])
          authGridRef.current!.api.deselectAll()
          authModal.close()
        }}
        onCancel={() => authModal.close()}
        forceRender
        width={750}
      >
        <div className="ag-theme-quartz h-[600px] w-full">
          <AgGridReact<PolicyDetailVo>
            ref={authGridRef}
            getRowId={(params) => params.data.cAuthCode}
            columnDefs={authColumnDefs}
            rowData={authListData}
            rowSelection={{
              mode: 'multiRow'
            }}
            selectionColumnDef={{
              sortable: true,
              suppressHeaderMenuButton: true,
              pinned: 'left',
              lockPinned: true
            }}
          />
        </div>
      </Modal>
    </>
  )
}
