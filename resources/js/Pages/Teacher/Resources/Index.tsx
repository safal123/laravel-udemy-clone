import TeacherDashboardLayout from '@/Layouts/TeacherDashboardLayout';
import React, { JSX } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  DocumentTextIcon,
  VideoCameraIcon,
  PhotoIcon,
  MusicalNoteIcon,
  DocumentIcon,
  TrashIcon,
  PencilIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Media {
  id: string;
  file_name: string;
  mime_type: string;
  type: 'video' | 'image' | 'document' | 'audio' | 'pdf' | 'other';
  size: number;
  path: string;
  caption?: string;
  created_at: string;
  is_processed: boolean;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  duration?: number;
  metadata: {
    model_id: string;
    model_type: string;
    sprite_sheet_path: string;
    storage_id: string;
    thumbnail_path: string;
    uploaded_at: string;
    uploaded_by: string;
    uploaded_by_name: string;
  };
}

const formatDuration = (seconds: number): string => {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const getFileIcon = (type: Media['type']) => {
  switch (type) {
    case 'video':
      return <VideoCameraIcon className="w-12 h-12 text-gray-400" />;
    case 'image':
      return <PhotoIcon className="w-12 h-12 text-gray-400" />;
    case 'audio':
      return <MusicalNoteIcon className="w-12 h-12 text-gray-400" />;
    case 'pdf':
      return <DocumentTextIcon className="w-12 h-12 text-gray-400" />;
    default:
      return <DocumentIcon className="w-12 h-12 text-gray-400" />;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Index = ({ resources }: { resources: Media[] }) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Media Resources</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your uploaded media files and resources
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group"
          >
            {/* Preview Section */}
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {resource.metadata.thumbnail_path ? (
                <img
                  src={resource.metadata.thumbnail_path}
                  alt={resource.file_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {getFileIcon(resource.type)}
                </div>
              )}

              {/* Duration Badge for Videos */}
              {resource.type === 'video' && resource.duration && (
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 rounded-md text-white text-xs font-medium flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" />
                  {formatDuration(resource.duration)}
                </div>
              )}

              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <PencilIcon className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors">
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <div>
                <h3 className="font-medium text-gray-900 truncate">
                  {resource.file_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-500">
                    {formatFileSize(resource.size)}
                  </p>
                  <span className="text-gray-300">•</span>
                  <p className="text-sm text-gray-500">
                    By {resource.metadata.uploaded_by_name}
                  </p>
                </div>
              </div>

              {resource.caption && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {resource.caption}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className={`px-2.5 py-1 text-xs font-medium rounded-full ${resource.status === 'completed' ? 'bg-green-100 text-green-700' :
                  resource.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    resource.status === 'failed' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                  }`}>
                  {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(resource.metadata.uploaded_at), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {resources.length === 0 && (
        <div className="text-center py-12">
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by uploading your first resource
          </p>
        </div>
      )}
    </div>
  );
};

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
