import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import { Course, PageProps, PaginatedData } from '@/types'
import { Head } from '@inertiajs/react'
import { Button } from '@/Components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { Separator } from '@/Components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import { FilterIcon, XIcon } from 'lucide-react'
import Footer from '@/Components/shared/Footer'
import Loader from "@/Components/shared/Loader";
import CourseCard from './_components/CourseCard'
import SidebarFilters from './_components/SidebarFilters'
import { useSearch } from '@/hooks/useSearch'

interface CoursePageProps extends PageProps {
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

const Index = ({ auth, courses, categories, search = '', filters = { category: [], level: '', sort: '', price: '' } }: CoursePageProps) => {
  const {
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
    loadMoreCourses
  } = useSearch({ courses, categories, search, filters })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HomePageNavbar auth={auth} />
      <Head title="Browse Courses" />

      <div className="container mx-auto px-4 py-8 flex-grow mt-16">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:hidden mb-4">
            <Button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
            >
              <FilterIcon className="mr-2 h-4 w-4" /> Filter Courses
            </Button>
          </div>

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
                    searchTerm={searchInputValue}
                    onSearchChange={handleSearchChange}
                    categories={categories}
                    selectedCategory={selectedCategories}
                    setSelectedCategory={handleCategoryChange}
                    selectedLevel={selectedLevel}
                    setSelectedLevel={handleLevelChange}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={handlePriceChange}
                    prices={prices}
                    levels={levels}
                    isSearching={isFetching}
                    onResetFilters={resetFilters}
                    searchInputRef={searchInputRef}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
              <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">Filters</h2>
              <Separator className="mb-3" />
              <SidebarFilters
                searchTerm={searchInputValue}
                onSearchChange={handleSearchChange}
                categories={categories}
                selectedCategory={selectedCategories}
                setSelectedCategory={handleCategoryChange}
                selectedLevel={selectedLevel}
                setSelectedLevel={handleLevelChange}
                selectedPrice={selectedPrice}
                setSelectedPrice={handlePriceChange}
                prices={prices}
                levels={levels}
                isSearching={isFetching}
                onResetFilters={resetFilters}
                searchInputRef={searchInputRef}
              />
            </div>
          </div>

          <div className="flex-1 relative">
            {isFetching && !isLoading && (
              <Loader
                size="lg"
                text="Loading courses..."
                className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg z-50"
              />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="w-full sm:w-auto">
                <div className="flex items-center justify-between sm:justify-start gap-3 mb-1">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">Explore Courses</h1>
                  {hasFilters && (
                    <Button
                      onClick={resetFilters}
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <XIcon className="h-3.5 w-3.5 mr-1" />
                      Reset Filters
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-orange-500">{courses.meta.total}</span> courses available for you
                </p>
                {hasFilters && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {searchTerm && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                        Search: {searchTerm}
                      </Badge>
                    )}
                    {selectedCategories.length > 0 && selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      >
                        Category: {categories.find(c => c.name === category)?.name || category}
                      </Badge>
                    ))}
                    {selectedLevel && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        Level: {selectedLevel}
                      </Badge>
                    )}
                    {selectedPrice && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                        Price: {prices.find(p => p.id === selectedPrice)?.name}
                      </Badge>
                    )}
                    {sortBy && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-50 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
                        Sort: {sortBy.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full sm:w-auto mt-4 sm:mt-0">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300 dark:border-gray-600 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {displayedCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedCourses.map((course: Course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>


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

export default Index
