import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ValueFormatterParams } from 'ag-grid-community'
import { AgGridReact, type CustomCellRendererProps } from 'ag-grid-react'
import { Upload } from 'antd'

import {
  type BOMChildItemVo,
  type BOMVo,
  childListQO,
  detailQO,
  NOT_FOUND_UID,
  supplyTypeLabelMap,
  useAuditMutation,
  useCancelMutation,
  useDeleteMutation,
  useExportMutation,
  useImportMutation
} from '@/features/bom'

import { AddModal, EditModal, TreeArea } from './-components'
import type { EditModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/bom/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage, message } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const [selectedTreeData, setSelectedTreeData] = useState<BOMVo | null>(null)

  const [form] = Form.useForm<BOMVo>()

  const addModal = useModal()
  const editModal = useModal<EditModalMeta>()

  const { data: detailData, isFetching: isDetailFetching } = useQuery(
    detailQO(selectedTreeData?.UID)
  )
  const { data: childListData, isFetching: isChildListFetching } = useQuery(
    childListQO(selectedTreeData?.UID)
  )
  const deleteMutation = useDeleteMutation()
  const auditMutation = useAuditMutation()
  const cancelMutation = useCancelMutation()
  const exportMutation = useExportMutation()
  const importMutation = useImportMutation()

  const columnDefs = useMemo<ColDef<BOMChildItemVo>[]>(
    () => [
      {
        field: 'iRowNumber',
        headerName: '子件行号',
        valueGetter: (params) => ((params.node!.rowIndex ?? 0) + 1) * 10,
        width: 120
      },
      { field: 'iProcessNumber', headerName: '工序行号', width: 120 },
      { field: 'cInvCode', headerName: '子件编码' },
      { field: 'cInvName', headerName: '子件名称' },
      { field: 'cEnglishName', headerName: '英文名称' },
      { field: 'cInvstd', headerName: '子件规格' },
      { field: 'cUnitName', headerName: '计量单位', width: 120 },
      { field: 'iBasicQty', headerName: '基本用量', width: 120 },
      { field: 'iBaseQty', headerName: '基础用量', width: 120 },
      { field: 'iLossRate', headerName: '损耗率', width: 120 },
      { field: 'iUseQty', headerName: '单位用量', width: 120 },
      {
        field: 'iFixedQty',
        headerName: '固定用量',
        cellRenderer: (p: CustomCellRendererProps) => booleanLabelValueGetter(p.value),
        width: 120
      },
      {
        field: 'cSupplyType',
        headerName: '供应类型',
        cellRenderer: (p: CustomCellRendererProps) => supplyTypeLabelMap.get(p.value),
        width: 120
      },
      { field: 'cWareHouseCode', headerName: '仓库编码' },
      { field: 'cDepName', headerName: '领料部门' },
      {
        field: 'cMaterialType',
        headerName: '物料属性',
        valueFormatter: (params: ValueFormatterParams) => (params.data.IsProduct ? '自制' : '采购'),
        width: 120
      },
      {
        field: 'dEffectiveDate',
        headerName: '生效日期',
        width: 200
      },
      {
        field: 'dExpirationDate',
        headerName: '失效日期',
        width: 200
      }
    ],
    []
  )

  return (
    <PageContainer>
      <Space>
        <PermCodeProvider code="bom:add">
          <Button
            type="primary"
            onClick={() => addModal.toggle()}
          >
            新增
          </Button>
        </PermCodeProvider>
        <PermCodeProvider code="bom:edit">
          <Button
            onClick={() => {
              if (!selectedTreeData) {
                showMessage('select-data')
                return
              }
              if (!selectedTreeData.IsProduct) {
                message.warning('非自制件，无法维护 BOM')
                return
              }
              editModal.setMeta({ UID: selectedTreeData.UID })
              editModal.toggle()
            }}
          >
            编辑
          </Button>
        </PermCodeProvider>
        <PermCodeProvider code="bom:delete">
          <Button
            onClick={() => {
              if (!selectedTreeData) {
                showMessage('select-data')
                return
              }
              deleteMutation.mutate([selectedTreeData.UID])
            }}
          >
            删除
          </Button>
        </PermCodeProvider>
        <PermCodeProvider code="bom:audit">
          <Button
            onClick={() => {
              if (!selectedTreeData) {
                showMessage('select-data')
                return
              }
              auditMutation.mutate([selectedTreeData.UID])
            }}
          >
            审核
          </Button>
        </PermCodeProvider>
        <PermCodeProvider code="bom:quit-audit">
          <Button
            onClick={() => {
              if (!selectedTreeData) {
                showMessage('select-data')
                return
              }
              cancelMutation.mutate([selectedTreeData.UID])
            }}
          >
            弃审
          </Button>
        </PermCodeProvider>
        <PermCodeProvider code="bom:import">
          <Upload
            customRequest={({ file }) => {
              const formData = new FormData()
              formData.append('cfile', file)
              importMutation.mutate(formData)
            }}
            showUploadList={false}
          >
            <Button>导入</Button>
          </Upload>
        </PermCodeProvider>
        <PermCodeProvider code="bom:export">
          <Button
            onClick={() =>
              exportMutation.mutate({
                conditions: selectedTreeData?.cInvCode
                  ? `cParentCode=${selectedTreeData?.cInvCode} && cParentVersion=${selectedTreeData?.cVersion}`
                  : undefined,
                orderByFileds: 'cParentCode'
              })
            }
            loading={exportMutation.isPending}
            disabled={exportMutation.isPending}
          >
            导出
          </Button>
        </PermCodeProvider>
      </Space>
      <Splitter>
        <Splitter.Panel collapsible>
          <TreeArea setSelectedTreeData={setSelectedTreeData} />
        </Splitter.Panel>
        <Splitter.Panel
          defaultSize="80%"
          min="70%"
        >
          {selectedTreeData?.UID && selectedTreeData.UID !== NOT_FOUND_UID && (
            <Space
              className="w-full pl-2"
              orientation="vertical"
            >
              <Form
                layout="horizontal"
                name="detail-form"
                form={form}
                labelCol={{ span: 8 }}
                initialValues={{}}
              >
                <Skeleton loading={isDetailFetching}>
                  <Row>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="BOM 类型">{detailData?.cBOMTypeName}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="产品编码">{detailData?.cInvCode}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="产品名称">{detailData?.cInvName}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="英文名称">{detailData?.cEnglishName}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="规格型号">{detailData?.cInvstd}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="产品数量">{detailData?.nQuantity}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="计量单位">{detailData?.cUnitName}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="版本代号">{detailData?.cVersion}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="版本日期">
                        {detailData?.dVersionDate?.format('YYYY-MM-DD')}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="版本说明">{detailData?.cVerisionMemo}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="替代标识">{detailData?.cReplaceStatus}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="替代说明">{detailData?.cReplaceMemo}</Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item<BOMVo> label="状态">{detailData?.iStatusName}</Form.Item>
                    </Col>
                  </Row>
                </Skeleton>
              </Form>

              <div className="ag-theme-quartz h-[calc(100vh-251px)]">
                <AgGridReact<BOMChildItemVo>
                  ref={gridRef}
                  getRowId={(params) => params.data.UID!}
                  columnDefs={columnDefs}
                  rowData={childListData}
                  loading={isChildListFetching}
                />
              </div>
            </Space>
          )}
        </Splitter.Panel>
      </Splitter>

      <AddModal
        open={addModal.open}
        setOpen={addModal.setOpen}
      />
      <EditModal
        meta={editModal.meta}
        open={editModal.open}
        setOpen={editModal.setOpen}
      />
    </PageContainer>
  )
}
