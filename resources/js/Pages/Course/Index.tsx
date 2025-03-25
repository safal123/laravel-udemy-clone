import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import { Course, PageProps, PaginatedData } from '@/types'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { Checkbox } from '@/Components/ui/checkbox'
import { Label } from '@/Components/ui/label'
import { Separator } from '@/Components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import { StarIcon, BookOpenIcon, ClockIcon, SearchIcon, FilterIcon, UserIcon, ChevronRightIcon, ChevronLeft, ChevronRight, ArrowRight, XIcon, LoaderIcon } from 'lucide-react'
import Footer from '@/Components/shared/Footer'
import { debounce } from 'lodash'


interface CoursePageProps extends PageProps {
  courses: PaginatedData<Course>
  categories: { id: string, name: string }[]
  search?: string
  filters?: {
    category: string
    level: string
    sort: string
    price?: string
  }
}

const Index = ({ auth, courses, categories, search = '', filters = { category: '', level: '', sort: '', price: '' } }: CoursePageProps) => {
  const [searchTerm, setSearchTerm] = useState(search)
  const [selectedCategory, setSelectedCategory] = useState(filters.category)
  const [selectedLevel, setSelectedLevel] = useState(filters.level)
  const [selectedPrice, setSelectedPrice] = useState(filters.price || '')
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>(courses.data)
  const [allLoadedCourses, setAllLoadedCourses] = useState<Course[]>(courses.data)
  const [sortBy, setSortBy] = useState(filters.sort)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(courses.meta.current_page)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [hasFilters, setHasFilters] = useState(search !== '' || filters.category !== '' || filters.level !== '' || filters.price !== '')
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { url } = usePage();

  const prices = [
    { id: 'free', name: 'Free' },
    { id: 'under-50', name: 'Under $50' },
    { id: '50-100', name: '$50 to $100' },
    { id: 'over-100', name: 'Over $100' }
  ]

  const levels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'all-levels', name: 'All Levels' }
  ]

  // Function to set global fetching state
  const startFetching = () => setIsFetching(true);
  const endFetching = () => setIsFetching(false);

  // Debounced search function that queries the database
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setIsSearching(true);
      setCurrentPage(1); // Reset to page 1 when search changes
      startFetching();
      // Use Inertia to refresh with the search term
      router.visit(
        window.location.pathname,
        {
          data: {
            page: 1, // Explicitly set page to 1
            search: term,
            category: selectedCategory,
            level: selectedLevel,
            price: selectedPrice,
            sort: sortBy
          },
          preserveState: true,
          preserveScroll: true,
          only: ['courses'],
          onFinish: () => {
            setIsSearching(false);
            endFetching();
          },
        },
      );
    }, 500),
    [selectedCategory, selectedLevel, selectedPrice, sortBy]
  );

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Apply category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when filter changes
    startFetching();
    router.visit(
      window.location.pathname,
      {
        data: {
          page: 1, // Explicitly set page to 1
          search: searchTerm,
          category: category,
          level: selectedLevel,
          price: selectedPrice,
          sort: sortBy
        },
        preserveState: true,
        preserveScroll: true,
        only: ['courses'],
        onFinish: () => endFetching()
      }
    );
  };

  // Apply level filter
  const handleLevelChange = (level: string, checked: boolean) => {
    const newLevel = checked ? level : '';
    setSelectedLevel(newLevel);
    setCurrentPage(1); // Reset to page 1 when filter changes
    startFetching();
    router.visit(
      window.location.pathname,
      {
        data: {
          page: 1, // Explicitly set page to 1
          search: searchTerm,
          category: selectedCategory,
          level: newLevel,
          price: selectedPrice,
          sort: sortBy
        },
        preserveState: true,
        preserveScroll: true,
        only: ['courses'],
        onFinish: () => endFetching()
      }
    );
  };

  // Apply price filter
  const handlePriceChange = (priceId: string, checked: boolean) => {
    const newPrice = checked ? priceId : '';
    setSelectedPrice(newPrice);
    setCurrentPage(1); // Reset to page 1 when filter changes
    startFetching();
    router.visit(
      window.location.pathname,
      {
        data: {
          page: 1, // Explicitly set page to 1
          search: searchTerm,
          category: selectedCategory,
          level: selectedLevel,
          price: newPrice,
          sort: sortBy
        },
        preserveState: true,
        preserveScroll: true,
        only: ['courses'],
        onFinish: () => endFetching()
      }
    );
  };

  // Apply sorting
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to page 1 when sort changes
    startFetching();
    router.visit(
      window.location.pathname,
      {
        data: {
          page: 1, // Explicitly set page to 1
          search: searchTerm,
          category: selectedCategory,
          level: selectedLevel,
          price: selectedPrice,
          sort: value
        },
        preserveState: true,
        preserveScroll: true,
        only: ['courses'],
        onFinish: () => endFetching()
      }
    );
  };

  // On initial render, ensure state is properly initialized from props
  useEffect(() => {
    // Initialize states with values from props
    setSearchTerm(search);
    setSelectedCategory(filters.category);
    setSelectedLevel(filters.level);
    setSelectedPrice(filters.price || '');
    setSortBy(filters.sort);
    setCurrentPage(courses.meta.current_page);
    setHasFilters(search !== '' || filters.category !== '' || filters.level !== '' || filters.price !== '');
    setAllLoadedCourses(courses.data);
    setDisplayedCourses(courses.data);
  }, []);

  // Check if any filters are applied whenever filter states change
  useEffect(() => {
    // Check if any filters are applied
    const hasActiveFilters = searchTerm !== '' || selectedCategory !== '' || selectedLevel !== '' || selectedPrice !== '';
    setHasFilters(hasActiveFilters);
  }, [searchTerm, selectedCategory, selectedLevel, selectedPrice]);

  // Track when courses prop changes (e.g. when more courses are loaded)
  useEffect(() => {
    // Only append new courses when loading more (when current page > 1)
    if (currentPage > 1) {
      // Log current state before updating
      console.log(`Before update: Displayed courses: ${displayedCourses.length}, New batch: ${courses.data.length}`);

      const updatedDisplayedCourses = [...displayedCourses];
      const existingIds = new Set(updatedDisplayedCourses.map(course => course.id));
      let addedCount = 0;

      // Add new courses without duplicates
      courses.data.forEach(course => {
        if (!existingIds.has(course.id)) {
          updatedDisplayedCourses.push(course);
          existingIds.add(course.id);
          addedCount++;
        }
      });

      console.log(`Added ${addedCount} new courses. Updated total: ${updatedDisplayedCourses.length}`);

      setDisplayedCourses(updatedDisplayedCourses);
      setAllLoadedCourses(updatedDisplayedCourses);
    } else {
      // On initial load, filter reset, or search/filter changes
      console.log(`Reset to initial ${courses.data.length} courses`);
      setAllLoadedCourses(courses.data);
      setDisplayedCourses(courses.data);
    }

    setIsLoading(false);
    endFetching();
  }, [courses.data]);

  // Function to load more courses
  const loadMoreCourses = () => {
    if (currentPage < courses.meta.last_page) {
      setIsLoading(true);
      startFetching();
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);


      router.visit(route('courses.index'), {
        data: {
          page: nextPage,
          search: searchTerm,
          category: selectedCategory,
          level: selectedLevel,
          price: selectedPrice,
          sort: sortBy
        },
        preserveState: true,
        only: ['courses'],
        onSuccess: (page) => {
          console.log(`Loaded page ${nextPage} successfully, received ${(page.props as any).courses.data.length} courses`);
          setIsLoading(false);
          endFetching();
        },
        onError: () => {
          setIsLoading(false);
          endFetching();
          setCurrentPage(prevPage => prevPage - 1); // Revert page count if error
        }
      });
    }
  }

  // Function to reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedPrice('');
    setIsLoading(true);
    startFetching();

    // Reset to page 1 and clear all filters
    setCurrentPage(1);

    // Use Inertia router instead of window.location to prevent full page refresh
    router.visit(window.location.pathname, {
      data: { page: 1 },
      preserveState: true,
      preserveScroll: true,
      only: ['courses'],
      onSuccess: () => {
        setIsLoading(false);
        endFetching();
        // Reset all loaded courses to just the first page after filters are cleared
        setAllLoadedCourses(courses.data);
        setDisplayedCourses(courses.data);
      }
    });
  }

  // Check for search=focus query param and focus the search input
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('search') === '' && searchInputRef.current) {
      // Scroll to the top and focus the search input
      window.scrollTo(0, 0);
      searchInputRef.current.focus();

      // Clean up the URL by removing the focus parameter
      const newParams = new URLSearchParams(window.location.search);
      newParams.delete('search');
      const newPath = window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : '');
      window.history.replaceState({}, '', newPath);
    }
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HomePageNavbar auth={auth} />
      <Head title="Browse Courses" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-grow mt-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
            >
              <FilterIcon className="mr-2 h-4 w-4" /> Filter Courses
            </Button>
          </div>

          {/* Mobile Filter Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden">
              <div className="w-80 h-full bg-white dark:bg-gray-800 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold text-gray-800 dark:text-white">Filters</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <XIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <Separator className="mb-3" />
                  <SidebarFilters
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={handleCategoryChange}
                    selectedLevel={selectedLevel}
                    setSelectedLevel={handleLevelChange}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={handlePriceChange}
                    prices={prices}
                    levels={levels}
                    isSearching={isSearching}
                    onResetFilters={resetFilters}
                    searchInputRef={searchInputRef}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
              <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">Filters</h2>
              <Separator className="mb-3" />
              <SidebarFilters
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
                selectedLevel={selectedLevel}
                setSelectedLevel={handleLevelChange}
                selectedPrice={selectedPrice}
                setSelectedPrice={handlePriceChange}
                prices={prices}
                levels={levels}
                isSearching={isSearching}
                onResetFilters={resetFilters}
                searchInputRef={searchInputRef}
              />
            </div>
          </div>

          {/* Main Course Content */}
          <div className="flex-1 relative">
            {/* Loading Overlay */}
            {isFetching && (
              <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center z-10 backdrop-blur-sm rounded-lg transition-opacity duration-200">
                <div className="flex flex-col items-center">
                  <div className="relative h-12 w-12 mb-3">
                    <div className="absolute inset-0 rounded-full border-t-2 border-orange-500 animate-[spin_1.2s_cubic-bezier(0.55,0.15,0.45,0.85)_infinite]"></div>
                    <div className="absolute inset-0 rounded-full border-r-2 border-transparent border-t-2 border-orange-500/30 animate-[spin_1.5s_cubic-bezier(0.55,0.15,0.45,0.85)_infinite]"></div>
                    <LoaderIcon size={32} className="absolute inset-0 m-auto text-orange-500 animate-pulse opacity-70" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 animate-pulse">Loading courses...</p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Explore Courses</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-orange-500">{courses.meta.total}</span> courses available for you
                </p>
              </div>

              <div className="mt-3 sm:mt-0">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px] border-gray-300 dark:border-gray-600 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    {/* <SelectItem value="rating">Highest Rated</SelectItem> */}
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Courses Grid */}
            {displayedCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedCourses.map((course: Course, index: number) => (
                    <CourseCard key={`${course.id}-${index}`} course={course} />
                  ))}
                </div>

                {/* Load More Button (only shown if no filters are applied) */}
                {currentPage < courses.meta.last_page && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={loadMoreCourses}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="relative h-4 w-4 mr-2">
                            <div className="absolute inset-0 rounded-full border-t-1 border-white animate-[spin_1.2s_cubic-bezier(0.55,0.15,0.45,0.85)_infinite]"></div>
                            <div className="absolute inset-0 rounded-full border-r-1 border-transparent border-t-1 border-white/30 animate-[spin_1.5s_cubic-bezier(0.55,0.15,0.45,0.85)_infinite]"></div>
                          </div>
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Courses
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* "Showing X of Y results" indicator */}
                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Showing {displayedCourses.length} of {courses.meta.total} courses
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="text-4xl mb-4">😕</div>
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                <Button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// SidebarFilters Component
interface SidebarFiltersProps {
  searchTerm: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  categories: { id: string, name: string }[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedLevel: string
  setSelectedLevel: (level: string, checked: boolean) => void
  selectedPrice: string
  setSelectedPrice: (priceId: string, checked: boolean) => void
  prices: { id: string, name: string }[]
  levels: { id: string, name: string }[]
  isSearching?: boolean
  isMobile?: boolean
  onResetFilters: () => void
  searchInputRef?: React.RefObject<HTMLInputElement>
}

const SidebarFilters = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedPrice,
  setSelectedPrice,
  prices,
  levels,
  isSearching = false,
  isMobile = false,
  onResetFilters,
  searchInputRef
}: SidebarFiltersProps) => {
  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Search</h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? (
              <div className="relative h-4 w-4">
                <div className="absolute inset-0 rounded-full border-t-1 border-orange-500 animate-[spin_1.2s_cubic-bezier(0.55,0.15,0.45,0.85)_infinite]"></div>
                <div className="absolute inset-0 rounded-full border-r-1 border-transparent border-t-1 border-orange-500/30 animate-[spin_1.5s_cubic-bezier(0.55,0.15,0.45,0.85)_infinite]"></div>
                <LoaderIcon className="absolute inset-0 m-auto h-3 w-3 text-orange-500" />
              </div>
            ) : (
              <SearchIcon className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <Input
            type="text"
            placeholder="Find courses..."
            value={searchTerm}
            onChange={onSearchChange}
            className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm h-9"
            ref={searchInputRef}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Categories</h3>
        <div className="space-y-1 max-h-[30vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div
            className={`cursor-pointer px-3 py-1 rounded-md text-xs ${!selectedCategory ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setSelectedCategory('')}
          >
            All Categories
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer px-3 py-1 rounded-md text-xs ${selectedCategory === category.name ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-3" />

      {/* Level */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Level</h3>
        <div className="space-y-1.5">
          {levels.map((level) => (
            <div key={level.id} className="flex items-center">
              <Checkbox
                id={`level-${level.id}`}
                checked={selectedLevel === level.name}
                onCheckedChange={(checked) => {
                  setSelectedLevel(level.name, !!checked);
                }}
                className="border-gray-300 dark:border-gray-600 h-3.5 w-3.5"
              />
              <Label
                htmlFor={`level-${level.id}`}
                className="ml-2 text-xs font-medium cursor-pointer text-gray-700 dark:text-gray-300"
              >
                {level.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-3" />

      {/* Price */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Price</h3>
        <div className="space-y-1.5">
          {prices.map((price) => (
            <div key={price.id} className="flex items-center">
              <Checkbox
                id={`price-${price.id}`}
                checked={selectedPrice === price.id}
                onCheckedChange={(checked) => {
                  setSelectedPrice(price.id, !!checked);
                }}
                className="border-gray-300 dark:border-gray-600 h-3.5 w-3.5"
              />
              <Label
                htmlFor={`price-${price.id}`}
                className="ml-2 text-xs font-medium cursor-pointer text-gray-700 dark:text-gray-300"
              >
                {price.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-3" />

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs h-8"
        onClick={onResetFilters}
      >
        <XIcon className="h-3.5 w-3.5 mr-1.5" />
        Reset All Filters
      </Button>
    </div>
  )
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col border-gray-200 dark:border-gray-700 relative">
      {/* Hover Overlay with View Course Button */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <Button
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          asChild
        >
          <Link href={route('courses.show', course.slug)}>
            View Details
          </Link>
        </Button>
      </div>

      {/* Course Image */}
      <div className="relative">
        <img
          src={course.image_url}
          alt={course.title}
          className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title and Price */}
      <CardContent className="p-4 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        {/* Title */}
        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
          {course.title}
        </h3>

        {/* Price */}
        <div className="mt-auto">
          {course.discount_price ? (
            <div className="flex items-center">
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">${course.discount_price}</span>
              <span className="ml-2 text-sm line-through text-gray-500">${course.price}</span>
            </div>
          ) : (
            <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">${course.price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Index
