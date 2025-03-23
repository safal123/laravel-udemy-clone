import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { PropsWithChildren, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal({
  children,
  show = false,
  maxWidth = '2xl',
  closeable = true,
  onClose = () => { },
  closeIcon = false,
  title,
  description,
  withCloseButton = false,
  position = 'center',
}: PropsWithChildren<{
  show: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  closeable?: boolean;
  onClose: CallableFunction;
  closeIcon?: boolean;
  title?: string;
  description?: string;
  withCloseButton?: boolean;
  position?: 'center' | 'top';
}>) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '4xl': 'sm:max-w-4xl',
  }[maxWidth];

  // Dynamic positioning
  const positionClass = position === 'top'
    ? 'items-start pt-16 sm:pt-24'
    : 'items-center';

  return (
    <Transition appear show={show} as="div" leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 z-50 transform transition-all"
        onClose={close}
      >
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75 backdrop-blur-sm" />
        </TransitionChild>

        <div className={`fixed inset-0 overflow-y-auto ${positionClass}`}>
          <div className="flex min-h-full justify-center p-4 text-center">
            <TransitionChild
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`mx-auto rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transform transition-all w-full ${maxWidthClass}`}
              >
                {closeIcon && closeable && (
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      type="button"
                      className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      onClick={close}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                )}

                {/* Title and description if provided */}
                {(title || description) && (
                  <div className="px-6 pt-6 pb-4">
                    {title && (
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                )}

                {children}

                {withCloseButton && closeable && (
                  <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={close}
                    >
                      Close
                    </button>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
