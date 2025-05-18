import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';

interface LearningStatsCardProps {
  totalCourses: number;
  inProgress: number;
  completed: number;
}

const LearningStatsCard: React.FC<LearningStatsCardProps> = ({
  totalCourses,
  inProgress,
  completed
}) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-800">Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pb-4">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600">Courses</span>
            <span className="font-medium">{totalCourses} enrolled</span>
          </div>
          <Progress value={totalCourses ? (totalCourses / (totalCourses + 2)) * 100 : 0} className="h-1.5 sm:h-2" />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600">In Progress</span>
            <span className="font-medium">{inProgress}</span>
          </div>
          <Progress
            value={inProgress && totalCourses ? (inProgress / totalCourses) * 100 : 0}
            className="h-1.5 sm:h-2 bg-gray-200"
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-600">Completed</span>
            <span className="font-medium">{completed}</span>
          </div>
          <Progress
            value={completed && totalCourses ? (completed / totalCourses) * 100 : 0}
            className="h-1.5 sm:h-2 bg-gray-200"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningStatsCard;
