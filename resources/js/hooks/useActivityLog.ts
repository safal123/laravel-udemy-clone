import { router } from '@inertiajs/react';
import { useCallback } from 'react';
import axios  from 'axios'

interface ActivityData {
  activityType: string;
  metadata?: any;
}

const useActivityLogger = () => {
  const logActivity = useCallback(async ({ activityType, metadata }: ActivityData) => {
    await axios.post(route('activities.store'), {
      activity_type: activityType,
      metadata,
    }).then(() => {
      console.log(activityType);
    })
  }, []);

  return { logActivity };
};

export default useActivityLogger;
