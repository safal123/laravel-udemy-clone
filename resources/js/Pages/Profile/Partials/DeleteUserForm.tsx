import { FormEventHandler, useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { AlertTriangle, Shield, X } from 'lucide-react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <header className="pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-600 dark:text-red-500" />
            Account Deletion
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Once your account is deleted, all of its resources and data will be permanently deleted. Before
            deleting your account, please download any data or information that you wish to retain.
          </p>
        </header>

        <div className="mt-6">
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Attention Required</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>
                    This action is irreversible and will result in the loss of all your account data, including:
                  </p>
                  <ul className="list-disc space-y-1 mt-2 pl-5">
                    <li>Personal profile information</li>
                    <li>Course progress and achievements</li>
                    <li>Payment history and subscriptions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DangerButton
            onClick={confirmUserDeletion}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-md shadow-sm"
          >
            Delete Account
          </DangerButton>
        </div>
      </div>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <div className="p-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600 dark:text-red-500" />
              Confirm Account Deletion
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Once your account is deleted, all of its resources and data will be permanently deleted. Please
              enter your password to confirm you would like to permanently delete your account.
            </p>

            <form onSubmit={deleteUser} className="mt-6">
              <div>
                <InputLabel htmlFor="password" value="Password" className="text-gray-700 dark:text-gray-300 font-medium" />
                <div className="mt-1 relative rounded-md shadow-sm">
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-600"
                    isFocused
                    placeholder="Enter your password to confirm"
                  />
                </div>
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-6 flex justify-between">
                <SecondaryButton
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600"
                >
                  Cancel
                </SecondaryButton>

                <DangerButton
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  disabled={processing}
                >
                  {processing ? 'Deleting...' : 'Delete Account'}
                </DangerButton>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </section>
  );
}
