import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
  Search,
  Heart,
  Eye,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Award,
  DollarSign,
  MoreHorizontal
} from 'lucide-react';
import { Input } from '@/Components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu';

interface WishlistItem {
  id: string;
  course: {
    id: string;
    slug: string;
    title: string;
    image_url: string;
    level: string;
    price: number;
    author?: {
      name: string;
    };
  };
}

interface WishlistTableProps {
  wishlistItems: WishlistItem[];
  onRemove: (wishlist: WishlistItem) => void;
}

type SortKey = 'title' | 'price' | 'level';
type SortDirection = 'asc' | 'desc';

const WishlistTable: React.FC<WishlistTableProps> = ({ wishlistItems, onRemove }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredItems = wishlistItems
    .filter(item =>
      item.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.course.author?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortKey) {
        case 'title':
          return sortDirection === 'asc'
            ? a.course.title.localeCompare(b.course.title)
            : b.course.title.localeCompare(a.course.title);
        case 'price':
          return sortDirection === 'asc'
            ? a.course.price - b.course.price
            : b.course.price - a.course.price;
        case 'level':
          return sortDirection === 'asc'
            ? a.course.level.localeCompare(b.course.level)
            : b.course.level.localeCompare(a.course.level);
        default:
          return 0;
      }
    });

  const getSortIcon = (key: SortKey) => {
    if (key !== sortKey) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === 'asc' ?
      <ChevronUp className="ml-1 h-4 w-4" /> :
      <ChevronDown className="ml-1 h-4 w-4" />;
  };

  // Action buttons for desktop
  const renderDesktopActions = (wishlist: WishlistItem) => (
    <div className="hidden md:flex space-x-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onRemove(wishlist)}
        className="h-7 px-2 text-xs"
      >
        <Trash2 className="h-3 w-3 mr-1 text-red-500" />
        Remove
      </Button>
      <Button
        size="sm"
        variant="default"
        asChild
        className="h-7 px-2 text-xs"
      >
        <Link href={route('courses.show', wishlist.course.slug || wishlist.course.id)}>
          <Eye className="h-3 w-3 mr-1" />
          View
        </Link>
      </Button>
    </div>
  );

  // Action dropdown for mobile
  const renderMobileActions = (wishlist: WishlistItem) => (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={route('courses.show', wishlist.course.slug || wishlist.course.id)}>
              <Eye className="h-4 w-4 mr-2" />
              View Course
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRemove(wishlist)}>
            <Trash2 className="h-4 w-4 mr-2 text-red-500" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">My Wishlist</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search wishlist..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] sm:w-[350px]">
                <button
                  className="flex items-center font-medium text-left"
                  onClick={() => handleSort('title')}
                >
                  Course {getSortIcon('title')}
                </button>
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                <button
                  className="flex items-center font-medium"
                  onClick={() => handleSort('level')}
                >
                  Level {getSortIcon('level')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center font-medium"
                  onClick={() => handleSort('price')}
                >
                  Price {getSortIcon('price')}
                </button>
              </TableHead>
              <TableHead className="w-[60px] md:w-auto">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-1 text-gray-500">
                    <Heart className="h-5 w-5 text-gray-400" />
                    <p>No courses in your wishlist</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((wishlist) => (
                <TableRow key={wishlist.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative h-10 w-14 sm:h-12 sm:w-16 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={wishlist.course.image_url}
                          alt={wishlist.course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-medium text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                          {wishlist.course.title}
                        </div>
                        {wishlist.course.author && (
                          <div className="text-xs text-gray-500 hidden sm:block">
                            By {wishlist.course.author.name}
                          </div>
                        )}
                        <div className="sm:hidden text-xs">
                          <Badge variant="outline" className="capitalize font-normal text-xs">
                            {wishlist.course.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="capitalize font-normal">
                      <Award className="h-3 w-3 mr-1 text-yellow-500" />
                      {wishlist.course.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center font-medium text-sm">
                      <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
                      {wishlist.course.price}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {renderDesktopActions(wishlist)}
                    {renderMobileActions(wishlist)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WishlistTable;
