import React from 'react'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Separator } from '@/Components/ui/separator'
import { CheckIcon, SearchIcon, XIcon } from 'lucide-react'

interface SidebarFiltersProps {
  searchTerm: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  categories: { id: string, name: string }[]
  selectedCategory: string[]
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
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Search</h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? (
              <div className="h-4 w-4 animate-pulse">
                <SearchIcon className="h-4 w-4 text-orange-500" />
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

      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Categories</h3>
        <div className="space-y-1 max-h-[30vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer px-3 py-1 rounded-md text-xs ${selectedCategory.includes(category.name)
                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                {selectedCategory.includes(category.name) && (
                  <CheckIcon className="h-3.5 w-3.5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-3" />

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

export default SidebarFilters
