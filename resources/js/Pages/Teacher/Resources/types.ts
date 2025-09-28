export interface Media {
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
