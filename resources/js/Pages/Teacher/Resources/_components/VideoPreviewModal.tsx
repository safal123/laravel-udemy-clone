import React from 'react';
import Modal from '@/Components/Modal';
import { Media } from '../types';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: Media | null;
}

export default function VideoPreviewModal({ isOpen, onClose, media }: VideoPreviewModalProps) {
  if (!media) return null;

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="p-4">
        <div className="aspect-video relative rounded-lg overflow-hidden bg-black">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src={media.path}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">
            {media.file_name}
          </h3>
          {media.caption && (
            <p className="mt-1 text-sm text-gray-500">
              {media.caption}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
