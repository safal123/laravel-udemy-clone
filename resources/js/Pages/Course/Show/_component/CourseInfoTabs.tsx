import React, { useState } from 'react';
import { Course } from '@/types';
import { BookOpen, Users, LightbulbIcon, CheckCircle, User, Info } from 'lucide-react';

interface CourseInfoTabsProps {
  course: Course;
}

const CourseInfoTabs: React.FC<CourseInfoTabsProps> = ({ course }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'audience' | 'requirements'>('learn');

  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 mb-6 overflow-hidden">
      {/* Card Header with Tabs */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="flex w-full min-w-full overflow-x-auto scrollbar-hide">
          <button
            className={`min-w-[33.33%] whitespace-nowrap px-3 sm:px-5 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium flex items-center justify-center transition-colors ${activeTab === 'learn' ? 'text-indigo-700 border-b-2 border-indigo-600 bg-white' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'}`}
            onClick={() => setActiveTab('learn')}
          >
            <BookOpen className={`h-4 w-4 md:h-5 md:w-5 mr-1.5 flex-shrink-0 ${activeTab === 'learn' ? 'text-indigo-600' : 'text-slate-500'}`} />
            <span className="truncate">What you'll learn</span>
          </button>
          <button
            className={`min-w-[33.33%] whitespace-nowrap px-3 sm:px-5 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium flex items-center justify-center transition-colors ${activeTab === 'audience' ? 'text-indigo-700 border-b-2 border-indigo-600 bg-white' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'}`}
            onClick={() => setActiveTab('audience')}
          >
            <Users className={`h-4 w-4 md:h-5 md:w-5 mr-1.5 flex-shrink-0 ${activeTab === 'audience' ? 'text-indigo-600' : 'text-slate-500'}`} />
            <span className="truncate">Who it's for</span>
          </button>
          <button
            className={`min-w-[33.33%] whitespace-nowrap px-3 sm:px-5 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium flex items-center justify-center transition-colors ${activeTab === 'requirements' ? 'text-indigo-700 border-b-2 border-indigo-600 bg-white' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'}`}
            onClick={() => setActiveTab('requirements')}
          >
            <LightbulbIcon className={`h-4 w-4 md:h-5 md:w-5 mr-1.5 flex-shrink-0 ${activeTab === 'requirements' ? 'text-indigo-600' : 'text-slate-500'}`} />
            <span className="truncate">Requirements</span>
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6 md:p-8">
        {/* What You'll Learn Section */}
        <div className={activeTab === 'learn' ? 'block' : 'hidden'}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {course.what_you_will_learn?.split(',').map((item, index) => (
              <li key={index} className="flex items-start group">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-slate-700 font-medium leading-snug">
                  {item.trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Target Audience Section */}
        <div className={activeTab === 'audience' ? 'block' : 'hidden'}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {course.target_audience?.split(',').map((audience, index) => (
              <li key={index} className="flex items-start group">
                <User className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-slate-700 font-medium leading-snug">
                  {audience.trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements Section */}
        <div className={activeTab === 'requirements' ? 'block' : 'hidden'}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {course.requirements?.split(',').map((requirement, index) => (
              <li key={index} className="flex items-start group">
                <Info className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-slate-700 font-medium leading-snug">
                  {requirement.trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Empty State */}
        {((activeTab === 'learn' && (!course.what_you_will_learn || course.what_you_will_learn.trim() === '')) ||
          (activeTab === 'audience' && (!course.target_audience || course.target_audience.trim() === '')) ||
          (activeTab === 'requirements' && (!course.requirements || course.requirements.trim() === ''))) && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                {activeTab === 'learn' && <BookOpen className="h-8 w-8 text-slate-400" />}
                {activeTab === 'audience' && <Users className="h-8 w-8 text-slate-400" />}
                {activeTab === 'requirements' && <LightbulbIcon className="h-8 w-8 text-slate-400" />}
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">No information available</h3>
              <p className="text-slate-500 max-w-sm">
                {activeTab === 'learn' && "The instructor hasn't provided learning objectives yet."}
                {activeTab === 'audience' && "The instructor hasn't specified who this course is for."}
                {activeTab === 'requirements' && "The instructor hasn't listed any prerequisites for this course."}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default CourseInfoTabs;
