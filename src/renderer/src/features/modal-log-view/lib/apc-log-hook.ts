import { useEffect, useState, useCallback } from 'react'
import { readApcLog } from '../../../shared/api'
import { ResponseApcLogDto } from '../../../shared/api/apc-api/dto/response/response-apc-log-dto'
import { Page } from '../../../shared/types/pages'

interface ApcLogProps {
  cctvId: number
  page?: number
  size?: number
}

export function useApcLog({ cctvId, page = 0, size = 10 }: ApcLogProps) {
  const [apcLogs, setApcLogs] = useState<Page<ResponseApcLogDto> | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [pageSize, setPageSize] = useState<number>(size)

  useEffect(() => {
    if (cctvId) {
      readLogs(cctvId, currentPage, pageSize)
    }
  }, [cctvId, currentPage, pageSize])

  const readLogs = async (cctvId: number, page = 0, size = 10) => {
    try {
      const data: Page<ResponseApcLogDto> = await readApcLog(cctvId, page, size)
      setApcLogs(data)
      return data
    } catch (error) {
      console.error('Error fetching apc logs:', error)
      return null
    }
  }

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(0) // 페이지 크기가 변경되면 첫 페이지로 이동
  }, [])

  // 데이터 새로고침 핸들러
  const refreshData = useCallback(() => {
    if (cctvId) {
      readLogs(cctvId, currentPage, pageSize)
    }
  }, [])

  return {
    apcLogs,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    refreshData,
    totalPages: apcLogs?.totalPages || 0,
    totalItems: apcLogs?.totalElements || 0
  }
}
