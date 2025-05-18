import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { Badge } from '@/Components/ui/badge';
import { ChevronRight, FileText, PlayCircle, TrendingUp, Clock } from 'lucide-react';

interface Resource {
  id: string;
  type: 'guide' | 'video' | 'path';
  title: string;
  description: string;
  icon: 'guide' | 'video' | 'path';
  link?: string;
  duration?: number;
  courses?: number;
}

interface ResourcesCardProps {
  resources: Resource[];
}

const ResourcesCard: React.FC<ResourcesCardProps> = ({ resources }) => {
  const getIcon = (iconType: string, size: number = 5) => {
    switch (iconType) {
      case 'guide':
        return <FileText className={`h-${size} w-${size}`} />;
      case 'video':
        return <PlayCircle className={`h-${size} w-${size}`} />;
      case 'path':
        return <TrendingUp className={`h-${size} w-${size}`} />;
      default:
        return <FileText className={`h-${size} w-${size}`} />;
    }
  };

  const getIconBgColor = (iconType: string) => {
    switch (iconType) {
      case 'guide':
        return 'bg-purple-100 text-purple-600';
      case 'video':
        return 'bg-green-100 text-green-600';
      case 'path':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3 border-b pt-4">
        <CardTitle className="text-base sm:text-lg font-semibold">Recommended Resources</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4">
        <div className="space-y-3 sm:space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 ${getIconBgColor(resource.icon)} rounded-lg flex items-center justify-center`}>
                {getIcon(resource.icon, 4)}
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base text-gray-800">{resource.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{resource.description}</p>

                {resource.type === 'guide' && resource.link && (
                  <Link
                    href={resource.link}
                    className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-medium inline-flex items-center mt-1"
                  >
                    Read Guide
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                )}

                {resource.type === 'video' && resource.duration && (
                  <div className="flex items-center mt-1 text-xs sm:text-sm text-gray-500">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                    <span>{resource.duration} minutes</span>
                  </div>
                )}

                {resource.type === 'path' && resource.courses && (
                  <Badge className="mt-1.5" variant="outline">{resource.courses} Courses</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesCard;
