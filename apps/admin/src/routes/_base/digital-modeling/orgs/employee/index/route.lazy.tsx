import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import {
  type EmployeeVo,
  listQO,
  useDeleteMutation,
  useFreezeMutation,
  useStartMutation,
  useStopMutation,
  useUnfreezeMutation
} from '@/features/employee'
import * as Users from '@/features/users'

import { EditDeptModal, EditPositionModal, EditRoleModal } from './-components'
import type { EditDeptModalMeta, EditPositionModalMeta, EditRoleModalMeta } from './-types'

export const Route = createLazyFileRoute('/_base/digital-modeling/orgs/employee/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()

  const editDeptModal = useModal<EditDeptModalMeta>()
  const editPositionModal = useModal<EditPositionModalMeta>()
  const editRoleModal = useModal<EditRoleModalMeta>()

  const gridRef = useRef<AgGridReact>(null)

  const { pageParams, setPageParams } = usePagination()
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams
    })
  )
  const startMutation = useStartMutation()
  const stopMutation = useStopMutation()
  const freezeMutation = useFreezeMutation()
  const unfreezeMutation = useUnfreezeMutation()
  const deleteMutation = useDeleteMutation()
  const resetPasswordMutation = Users.useResetPasswordMutation()

  const columnDefs = useMemo<ColDef<EmployeeVo>[]>(
    () => [
      { field: 'cPersonCode', headerName: '编码' },
      { field: 'cPersonName', headerName: '姓名' },
      // { field: 'cSexTypeCode', headerName: '性别' },
      { field: 'cDepName', headerName: '部门' },
      { field: 'cProfessionalTypeName', headerName: '职务' },
      { field: 'cMobile', headerName: '手机' },
      {
        field: 'IsValid',
        headerName: '是否启用',
        editable: true,
        cellDataType: 'boolean',
        onCellValueChanged: (event) =>
          event.newValue
            ? startMutation.mutate([event.data.UID])
            : stopMutation.mutate([event.data.UID])
      },
      {
        field: 'bFreeze',
        headerName: '是否冻结',
        editable: true,
        cellDataType: 'boolean',
        onCellValueChanged: (event) =>
          event.newValue
            ? freezeMutation.mutate([event.data.UID])
            : unfreezeMutation.mutate([event.data.UID])
      },
      { field: 'dEndLoginTime', headerName: '最后登录' },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams) => (
          <Space>
            <PermCodeProvider code="employee:edit">
              <Link
                to="/digital-modeling/orgs/employee/$id/edit"
                params={{ id: params.data!.UID }}
              >
                <Button
                  size="small"
                  color="primary"
                  variant="text"
                >
                  编辑
                </Button>
              </Link>
            </PermCodeProvider>
            <PermCodeProvider code="employee:delete">
              <Popconfirm
                title="确认执行该操作？"
                okButtonProps={{
                  disabled: deleteMutation.isPending,
                  loading: deleteMutation.isPending
                }}
                onConfirm={() => deleteMutation.mutate([params.data!.UID])}
              >
                <Button
                  size="small"
                  color="primary"
                  variant="text"
                  disabled={deleteMutation.isPending}
                >
                  删除
                </Button>
              </Popconfirm>
            </PermCodeProvider>
          </Space>
        )
      }
    ],
    [deleteMutation, freezeMutation, startMutation, stopMutation, unfreezeMutation]
  )

  return (
    <PageContainer>
      <Space
        orientation="vertical"
        className="w-full"
      >
        <Flex
          className="h-8"
          justify="space-between"
          align="center"
        >
          <Space>
            <PermCodeProvider code="employee:delete">
              <Popconfirm
                title="确认执行该操作？"
                okButtonProps={{
                  disabled: deleteMutation.isPending,
                  loading: deleteMutation.isPending
                }}
                onConfirm={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  deleteMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                <Button disabled={deleteMutation.isPending}>删除</Button>
              </Popconfirm>
            </PermCodeProvider>
          </Space>
          <Space>
            <PermCodeProvider code="employee:edit-role">
              <Button
                onClick={() => {
                  editRoleModal.setMeta({ ids: selectedRows.map((i) => i.cEmployeeCode) })
                  editRoleModal.toggle()
                }}
              >
                修改角色
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="employee:edit-dept">
              <Button
                onClick={() => {
                  editDeptModal.setMeta({ ids: selectedRows.map((i) => i.UID) })
                  editDeptModal.toggle()
                }}
              >
                修改部门
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="employee:edit-position">
              <Button
                onClick={() => {
                  editPositionModal.setMeta({ ids: selectedRows.map((i) => i.UID) })
                  editPositionModal.toggle()
                }}
              >
                修改职务
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="employee:edit">
              <Button
                onClick={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  startMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                启用员工
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="employee:edit">
              <Button
                onClick={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  stopMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                停用员工
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="employee:freeze">
              <Button
                onClick={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  freezeMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                冻结员工
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="employee:unfreeze">
              <Button
                onClick={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  unfreezeMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                解冻员工
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="employee:reset-password">
              <Popconfirm
                title="确认执行该操作？"
                okButtonProps={{
                  disabled: deleteMutation.isPending,
                  loading: deleteMutation.isPending
                }}
                onConfirm={() => {
                  if (!selectedRows.length) {
                    showMessage('select-data')
                    return
                  }
                  resetPasswordMutation.mutate(selectedRows.map((i) => i.UID))
                }}
              >
                <Button disabled={resetPasswordMutation.isPending}>重置密码</Button>
              </Popconfirm>
            </PermCodeProvider>
            <PermCodeProvider code="employee:add">
              <Link to="/digital-modeling/orgs/employee/add">
                <Button type="primary">新增职员</Button>
              </Link>
            </PermCodeProvider>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-251px)]">
          <AgGridReact<EmployeeVo>
            ref={gridRef}
            getRowId={(params) => params.data.UID}
            columnDefs={columnDefs}
            rowData={data?.data}
            rowSelection={{
              mode: 'multiRow'
            }}
            selectionColumnDef={{
              sortable: true,
              suppressHeaderMenuButton: true,
              pinned: 'left',
              lockPinned: true
            }}
            loading={isFetching}
            onSelectionChanged={(event) => setSelectedRows(event.api.getSelectedRows())}
          />
        </div>

        <Flex
          justify="end"
          align="center"
        >
          <Pagination
            disabled={isPlaceholderData}
            showSizeChanger
            showQuickJumper
            showTotal={(total) =>
              selectedRows.length > 0
                ? `已选中 ${selectedRows.length} 条，共计 ${total} 条`
                : `共计 ${total} 条`
            }
            total={data?.dataCount}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) => {
              setSelectedRows(gridRef.current!.api.getSelectedRows())
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }}
          />
        </Flex>
      </Space>
      <EditDeptModal
        meta={editDeptModal.meta}
        open={editDeptModal.open}
        setOpen={editDeptModal.setOpen}
      />
      <EditPositionModal
        meta={editPositionModal.meta}
        open={editPositionModal.open}
        setOpen={editPositionModal.setOpen}
      />
      <EditRoleModal
        meta={editRoleModal.meta}
        open={editRoleModal.open}
        setOpen={editRoleModal.setOpen}
      />
    </PageContainer>
  )
}
