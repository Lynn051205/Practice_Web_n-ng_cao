import { useMemo, useState } from 'react'

export interface PaginationResult<T> {
  currentPage: number
  totalPages: number
  currentItems: T[]
  next: () => void
  prev: () => void
  goToPage: (page: number) => void
}

export function usePagination<T>(items: T[], itemsPerPage: number): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  const safePage = Math.min(currentPage, totalPages)
  const currentItems = useMemo(() => {
    const startIndex = (safePage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }, [items, itemsPerPage, safePage])

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages))
  }

  return {
    currentPage: safePage,
    totalPages,
    currentItems,
    next: () => goToPage(safePage + 1),
    prev: () => goToPage(safePage - 1),
    goToPage,
  }
}
