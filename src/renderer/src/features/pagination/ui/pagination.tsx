import { FC, ReactNode } from 'react'
import styles from './pagination.module.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50]
}) => {
  // 페이지 버튼 렌더링 함수
  const renderPageButtons = () => {
    const pages: ReactNode[] = []

    // 첫 페이지 버튼
    pages.push(
      <button
        key="first"
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className={styles.pageButton}
        title="첫 페이지"
      >
        &laquo;
      </button>
    )

    // 이전 페이지 버튼
    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className={styles.pageButton}
        title="이전 페이지"
      >
        &lsaquo;
      </button>
    )

    // 페이지 번호 버튼들
    // 너무 많은 페이지가 있을 경우 일부만 표시
    const maxPageButtons = 5
    let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2))
    let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1)

    // 시작 페이지 조정
    if (endPage - startPage + 1 < maxPageButtons && startPage > 0) {
      startPage = Math.max(0, endPage - maxPageButtons + 1)
    }

    // 첫 페이지 표시 (생략 부호와 함께)
    if (startPage > 0) {
      pages.push(
        <button key="ellipsis-start" disabled={true} className={styles.pageButton}>
          ...
        </button>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={currentPage === i}
          className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ''}`}
        >
          {i + 1}
        </button>
      )
    }

    // 마지막 페이지 표시 (생략 부호와 함께)
    if (endPage < totalPages - 1) {
      pages.push(
        <button key="ellipsis-end" disabled={true} className={styles.pageButton}>
          ...
        </button>
      )
    }

    // 다음 페이지 버튼
    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage >= totalPages - 1}
        className={styles.pageButton}
        title="다음 페이지"
      >
        &rsaquo;
      </button>
    )

    // 마지막 페이지 버튼
    pages.push(
      <button
        key="last"
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage >= totalPages - 1}
        className={styles.pageButton}
        title="마지막 페이지"
      >
        &raquo;
      </button>
    )

    return pages
  }

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationControls}>
        <div className={styles.pageSizeSelector}>
          <span>페이지 크기:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={styles.pageSizeSelect}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.pagination}>{renderPageButtons()}</div>

        <div className={styles.pageInfo}>
          {totalItems > 0 ? (
            <>
              {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, totalItems)} /
              {totalItems} 항목
            </>
          ) : (
            '0 항목'
          )}
        </div>
      </div>
    </div>
  )
}
