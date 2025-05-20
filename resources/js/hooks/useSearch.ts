import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { router, usePage } from '@inertiajs/react'
import debounce from 'lodash/debounce'
import { Course, PageProps, PaginatedData } from '@/types'

interface UseSearchProps {
  courses: PaginatedData<Course>
  categories: { id: string, name: string }[]
  search?: string
  filters?: {
    category: string[]
    level: string
    sort: string
    price?: string
  }
}

interface SearchParams {
  page: number
  search?: string
  category?: string[]
  level?: string
  price?: string
  sort?: string
  [key: string]: any // Allow for dynamic keys
}

export function useSearch({
  courses,
  categories,
  search = '',
  filters = { category: [], level: '', sort: '', price: '' }
}: UseSearchProps) {
  const [searchTerm, setSearchTerm] = useState(search)
  const [searchInputValue, setSearchInputValue] = useState(search)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.category)
  const [selectedLevel, setSelectedLevel] = useState(filters.level)
  const [selectedPrice, setSelectedPrice] = useState(filters.price || '')
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>(courses.data)
  const [sortBy, setSortBy] = useState(filters.sort)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(courses.meta.current_page)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { url } = usePage()

  const prices = useMemo(() => [
    { id: 'free', name: 'Free' },
    { id: 'under-50', name: 'Under $50' },
    { id: '50-100', name: '$50 to $100' },
    { id: 'over-100', name: 'Over $100' }
  ], [])

  const levels = useMemo(() => [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'all-levels', name: 'All Levels' }
  ], [])

  const hasFilters = useMemo(() => {
    return searchTerm !== '' ||
      selectedCategories.length > 0 ||
      selectedLevel !== '' ||
      selectedPrice !== '';
  }, [searchTerm, selectedCategories, selectedLevel, selectedPrice])

  const startFetching = () => setIsFetching(true)
  const endFetching = () => setIsFetching(false)

  const fetchCourses = useCallback((page: number, params: Partial<SearchParams> = {}) => {
    startFetching()
    setCurrentPage(page)

    // Clean up the params to ensure category is always sent as an array
    const queryParams: SearchParams = {
      page,
      ...params,
      // Always send category as an array, even if empty
      'category[]': params.category || []
    }

    // Remove undefined or empty array values
    Object.keys(queryParams).forEach(key => {
      const value = queryParams[key]
      if (Array.isArray(value) && value.length === 0) {
        delete queryParams[key]
      }
      if (value === undefined || value === '') {
        delete queryParams[key]
      }
    })

    setTimeout(() => {
      router.get(
        route('courses.index'),
        queryParams,
        {
          preserveState: true,
          preserveScroll: true,
          only: ['courses'],
          onSuccess: () => {
            if (page === 1) {
              setDisplayedCourses(courses.data)
            }
            endFetching()
          }
        }
      )
    }, 1000)
  }, [courses.data])

  const applyFilters = useCallback((page = 1) => {
    fetchCourses(page, {
      search: searchTerm,
      category: selectedCategories,
      level: selectedLevel,
      price: selectedPrice,
      sort: sortBy
    })
  }, [searchTerm, selectedCategories, selectedLevel, selectedPrice, sortBy, fetchCourses])

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term)
      applyFilters(1)
    }, 1000),
    [applyFilters]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    debouncedSearch(value)
  }

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(newCategories)
    applyFilters(1)
  }

  const handleLevelChange = (level: string, checked: boolean) => {
    const newLevel = checked ? level : ''
    setSelectedLevel(newLevel)
    applyFilters(1)
  }

  const handlePriceChange = (priceId: string, checked: boolean) => {
    const newPrice = checked ? priceId : ''
    setSelectedPrice(newPrice)
    applyFilters(1)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    applyFilters(1)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSearchInputValue('')
    setSelectedCategories([])
    setSelectedLevel('')
    setSelectedPrice('')
    setSortBy('')

    fetchCourses(1)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('search') === '' && searchInputRef.current) {
      window.scrollTo(0, 0)
      searchInputRef.current.focus()

      const newParams = new URLSearchParams(window.location.search)
      newParams.delete('search')
      const newPath = window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : '')
      window.history.replaceState({}, '', newPath)
    }
  }, [url])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const categoryFromUrl = urlParams.getAll('category') || []
    const levelFromUrl = urlParams.get('level') || ''
    const priceFromUrl = urlParams.get('price') || ''
    const sortFromUrl = urlParams.get('sort') || ''
    const searchFromUrl = urlParams.get('search') || ''

    setSearchTerm(searchFromUrl || search)
    setSearchInputValue(searchFromUrl || search)
    setSelectedCategories(categoryFromUrl.length > 0 ? categoryFromUrl : filters.category)
    setSelectedLevel(levelFromUrl || filters.level)
    setSelectedPrice(priceFromUrl || filters.price || '')
    setSortBy(sortFromUrl || filters.sort)
    setCurrentPage(courses.meta.current_page)
    setDisplayedCourses(courses.data)
  }, [])

  useEffect(() => {
    if (currentPage > 1) {
      const existingIds = new Set(displayedCourses.map(course => course.id))
      const newCourses = courses.data.filter(course => !existingIds.has(course.id))

      if (newCourses.length > 0) {
        setDisplayedCourses(prevCourses => [...prevCourses, ...newCourses])
      }
    } else {
      setDisplayedCourses(courses.data)
    }

    setIsLoading(false)
    endFetching()
  }, [courses.data, currentPage])

  const loadMoreCourses = () => {
    if (currentPage < courses.meta.last_page) {
      setIsLoading(true)
      applyFilters(currentPage + 1)
    }
  }

  return {
    searchTerm,
    searchInputValue,
    selectedCategories,
    selectedLevel,
    selectedPrice,
    displayedCourses,
    sortBy,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    currentPage,
    isLoading,
    isFetching,
    searchInputRef,
    prices,
    levels,
    hasFilters,
    handleSearchChange,
    handleCategoryChange,
    handleLevelChange,
    handlePriceChange,
    handleSortChange,
    resetFilters,
    loadMoreCourses,
    courses
  }
}
