import type { Dispatch, SetStateAction } from 'react'

interface UsePaginationProps {
  pageSize?: number
  pageIndex?: number
}

interface PageParams {
  pageSize: number
  pageIndex: number
}

interface UsePagination {
  pageParams: PageParams
  setPageParams: Dispatch<SetStateAction<PageParams>>
  resetPageParams: () => void
}

export const usePagination = (props?: UsePaginationProps): UsePagination => {
  const [pageParams, setPageParams] = useState({
    pageIndex: props?.pageIndex ?? defaultPageDto.pageIndex,
    pageSize: props?.pageSize ?? defaultPageDto.pageSize
  })

  const resetPageParams = () =>
    setPageParams({
      pageIndex: props?.pageIndex ?? defaultPageDto.pageIndex,
      pageSize: props?.pageSize ?? defaultPageDto.pageSize
    })

  return { pageParams, setPageParams, resetPageParams }
}
