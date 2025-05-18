import React, { useState } from 'react';
import { Course } from '@/types';
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
  CalendarDays,
  Clock,
  Eye,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { Input } from '@/Components/ui/input';

interface CourseTableProps {
  courses: Course[];
}

type SortKey = 'title' | 'createdAt' | 'progress' | 'level';
type SortDirection = 'asc' | 'desc';

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      // Toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort key and reset direction to asc
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredCourses = courses
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortKey) {
        case 'title':
          return sortDirection === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        case 'level':
          return sortDirection === 'asc'
            ? a.level.localeCompare(b.level)
            : b.level.localeCompare(a.level);
        case 'createdAt':
          return sortDirection === 'asc'
            ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'progress':
          // This assumes you track progress as a percentage
          const progressA = a.progress || 0;
          const progressB = b.progress || 0;
          return sortDirection === 'asc'
            ? progressA - progressB
            : progressB - progressA;
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

  // Function to calculate a random progress value for demo purposes
  const getRandomProgress = (courseId: string) => {
    // Use courseId to keep the value consistent
    const seed = parseInt(courseId.toString().slice(-4)) || 0;
    return Math.min(100, Math.max(0, (seed % 100)));
  };

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">
                <button
                  className="flex items-center font-medium text-left"
                  onClick={() => handleSort('title')}
                >
                  Course {getSortIcon('title')}
                </button>
              </TableHead>
              <TableHead>
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
                  onClick={() => handleSort('progress')}
                >
                  Progress {getSortIcon('progress')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center font-medium"
                  onClick={() => handleSort('createdAt')}
                >
                  Added {getSortIcon('createdAt')}
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => {
                const progress = getRandomProgress(course.id.toString());

                return (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded">
                          <img
                            src={course.image_url}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <BookOpen className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {course.chapters_count || 0} {course.chapters_count === 1 ? 'Chapter' : 'Chapters'}
                            </span>
                            <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
                            <span>{course.duration_minutes || 0} min</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize font-normal">
                        {course.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {progress}% complete
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                        {new Date(course.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route('courses.show', course.slug || course.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Course
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
