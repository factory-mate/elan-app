import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'

import * as Employee from '@/features/employee'
import * as Menus from '@/features/menus'
import * as Policy from '@/features/policy'
import { LIST_QK, listQO, useDeleteMutation, type UserPolicyVo } from '@/features/user-policy'

import { AddModal, EditModal } from './-components'
import type { EditModalMeta, FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/perm-mgt/user-policy')({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm()
  const { showMessage } = useMessage()
  const location = useLocation()
  const addModal = useModal()
  const editModal = useModal<EditModalMeta>()
  const { getContextMenuItems, initTableSettings } = useTableSettings()

  const filterCacheStore = useFilterCacheStore()

  const gridRef = useRef<AgGridReact>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>(
    filterCacheStore.getItem(location.pathname) ?? {}
  )

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cUserName', type: 'like', val: filterData.cUserName },
        { key: 'cMenuName', type: 'like', val: filterData.cMenuName },
        { key: 'cPolicyName', type: 'like', val: filterData.cPolicyName }
      ])
    })
  )
  const { data: menuCandidates } = useQuery(Menus.fullListQO())
  const { data: employeeCandidates } = useQuery(Employee.fullListQO())
  const { data: policyCandidates } = useQuery(Policy.fullListQO())

  const deleteMutation = useDeleteMutation()

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      {
        name: 'cUserName',
        label: '用户名称',
        type: 'select',
        selectProps: {
          options: employeeCandidates,
          fieldNames: {
            label: 'cEmployeeName',
            value: 'cEmployeeCode'
          },
          showSearch: {
            filterOption: (input, option) =>
              (option?.cEmployeeName ?? '').toLowerCase().includes(input.toLowerCase())
          },
          allowClear: true
        }
      },
      {
        name: 'cMenuName',
        label: '资源名称',
        type: 'select',
        selectProps: {
          options: menuCandidates,
          fieldNames: {
            label: 'cMenuName',
            value: 'cMenuCode'
          },
          showSearch: {
            filterOption: (input, option) =>
              (option?.cMenuName ?? '').toLowerCase().includes(input.toLowerCase())
          },
          allowClear: true
        }
      },
      {
        name: 'cPolicyName',
        label: '策略名称',
        type: 'select',
        selectProps: {
          options: policyCandidates,
          fieldNames: {
            label: 'cPolicyName',
            value: 'cPolicyCode'
          },
          showSearch: {
            filterOption: (input, option) =>
              (option?.cPolicyName ?? '').toLowerCase().includes(input.toLowerCase())
          },
          allowClear: true
        }
      }
    ],
    [employeeCandidates, menuCandidates, policyCandidates]
  )

  const columnDefs = useMemo<ColDef<UserPolicyVo>[]>(
    () => [
      { field: 'cUserName', headerName: '用户名称', flex: 1 },
      { field: 'cMenuName', headerName: '资源名称', flex: 1 },
      { field: 'cPolicyName', headerName: '策略名称', flex: 1 },
      { field: 'cPolicyCode', headerName: '策略编码', flex: 1 },
      { field: 'cCreateUserName', headerName: '创建人', flex: 1 },
      { field: 'dCreateTime', headerName: '创建时间', flex: 1 },
      {
        headerName: '操作',
        width: 150,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<UserPolicyVo>) => (
          <Space>
            <PermCodeProvider code="user-policy:edit">
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={() => {
                  editModal.setMeta({ UID: params.data!.UID })
                  editModal.toggle()
                }}
              >
                编辑
              </Button>
            </PermCodeProvider>
            <PermCodeProvider code="user-policy:delete">
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
    [deleteMutation, editModal]
  )

  return (
    <PageContainer>
      <FilterArea
        form={{ form }}
        filterDefs={filterDefs}
        filterData={filterData}
        setFilterData={setFilterData}
        queryKey={LIST_QK}
      />
      <Flex
        className="h-8"
        justify="space-between"
        align="center"
      >
        <Space>
          <PermCodeProvider code="user-policy:delete">
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
          <PermCodeProvider code="user-policy:add">
            <Button
              type="primary"
              onClick={() => addModal.toggle()}
            >
              新增
            </Button>
          </PermCodeProvider>
        </Space>
      </Flex>

      <div className="ag-theme-quartz flex-1">
        <AgGridReact<UserPolicyVo>
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
          gridId="list"
          getContextMenuItems={getContextMenuItems}
          onGridReady={(e) => initTableSettings(e)}
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
