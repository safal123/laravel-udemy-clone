import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  bgColor?: string;
  iconBgColor?: string;
  iconColor?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  bgColor = "bg-gray-50",
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600"
}) => {
  return (
    <Card className={`${bgColor} border-gray-200`}>
      <CardContent className="p-4 sm:p-6 text-center">
        <div className="flex flex-col items-center">
          <div className={`rounded-full ${iconBgColor} p-2 sm:p-3 mb-3`}>
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
          </div>

          <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">{description}</p>

          {actionText && actionLink && (
            <Button className="mt-4 w-full sm:w-auto" variant="outline" asChild>
              <Link href={actionLink}>{actionText}</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
