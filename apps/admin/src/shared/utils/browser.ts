import type { AxiosResponse } from 'axios'

const DEFAULT_DOWNLOAD_EXCEL_FILENAME = 'download.xlsx'

function getFilenameFromContentDisposition(contentDisposition: string) {
  const regex = /filename\*=(UTF-\d{1,})?''([^;\n]*)/g
  const matches = regex.exec(contentDisposition)
  if (matches && matches.length > 2) {
    const encodedFilename = matches[2]
    const decodedFilename = decodeURIComponent(encodedFilename)
    return decodedFilename
  }
  return null
}

function buildExcelBlob(binaryData: BlobPart) {
  return new Blob([binaryData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadExcel(res: AxiosResponse<BlobPart>) {
  downloadBlob(
    buildExcelBlob(res.data),
    getFilenameFromContentDisposition(res.headers['content-disposition'] as string) ??
      DEFAULT_DOWNLOAD_EXCEL_FILENAME
  )
}
