import { useState, useCallback } from 'react'

interface UsePaginationProps {
  initialPage?: number
  initialPageSize?: number
  totalItems?: number
}

export function usePagination({
  initialPage = 0,
  initialPageSize = 10,
  totalItems = 0
}: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [pageSize, setPageSize] = useState<number>(initialPageSize)
  
  // 총 페이지 수 계산
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  
  // 페이지 변경 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    // 페이지 범위 검증
    const validPage = Math.max(0, Math.min(newPage, totalPages - 1))
    setCurrentPage(validPage)
  }, [totalPages])
  
  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize)
    // 페이지 크기가 변경되면 첫 페이지로 이동
    setCurrentPage(0)
  }, [])
  
  // 현재 페이지의 항목 범위 계산
  const startIndex = currentPage * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  
  return {
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    handlePageSizeChange
  }
}
