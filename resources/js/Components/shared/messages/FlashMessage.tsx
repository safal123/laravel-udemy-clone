import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Alert from "@/Components/shared/Alert";

export default function FlashedMessages() {
  const [visible, setVisible] = useState(true);
  const { flash, errors } = usePage<any>().props;
  const formErrors = Object.keys(errors).length;

  useEffect(() => {
    setVisible(true);
  }, [flash, errors]);

  if (!flash && !errors) {
    return null;
  }

  return (
    // center
    <div className={'fixed md:top-2 right-1/2 transform translate-x-1/2 z-50 w-full max-w-xl'}>
      {flash.success && visible && (
        <Alert
          variant="success"
          message={flash.success}
          onClose={() => setVisible(false)}
        />
      )}
      {flash.error && visible && (
        <Alert
          variant="error"
          message={flash.error}
          onClose={() => setVisible(false)}
        />
      )}
      {formErrors > 0 && visible && (
        <Alert
          variant="error"
          message={'There are ' + formErrors + ' form errors.'}
          onClose={() => setVisible(false)}
        />
      )}
    </div>
  );
}
