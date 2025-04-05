import React, { useState } from 'react';
import { Course } from '@/types';

interface CourseInfoTabsProps {
  course: Course;
}

const CourseInfoTabs: React.FC<CourseInfoTabsProps> = ({ course }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'audience' | 'requirements'>('learn');

  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 mb-6 overflow-hidden">
      {/* Card Header with Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex overflow-x-auto scrollbar-hide -mx-0.5">
          <button
            className={`whitespace-nowrap px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium flex items-center transition-colors ${activeTab === 'learn' ? 'text-gray-800 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('learn')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2 flex-shrink-0 ${activeTab === 'learn' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.666 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
            </svg>
            <span>What you'll learn</span>
          </button>
          <button
            className={`whitespace-nowrap px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium flex items-center transition-colors ${activeTab === 'audience' ? 'text-gray-800 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('audience')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2 flex-shrink-0 ${activeTab === 'audience' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>Who it's for</span>
          </button>
          <button
            className={`whitespace-nowrap px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium flex items-center transition-colors ${activeTab === 'requirements' ? 'text-gray-800 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('requirements')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2 flex-shrink-0 ${activeTab === 'requirements' ? 'text-indigo-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span>Requirements</span>
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6">
        {/* What You'll Learn Section */}
        <div className={activeTab === 'learn' ? 'block' : 'hidden'}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {course.what_you_will_learn?.split(',').map((item, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 leading-tight">
                  {item.trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Target Audience Section */}
        <div className={activeTab === 'audience' ? 'block' : 'hidden'}>
          <ul className="space-y-3">
            {course.target_audience?.split(',').map((audience, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 leading-tight">
                  {audience.trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements Section */}
        <div className={activeTab === 'requirements' ? 'block' : 'hidden'}>
          <ul className="space-y-3">
            {course.requirements?.split(',').map((requirement, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 leading-tight">
                  {requirement.trim()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoTabs;
