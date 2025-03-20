import { FormEventHandler, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Check, Lock, ShieldCheck } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <header className="pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-500" />
            Update Password
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </header>

        <form onSubmit={updatePassword} className="mt-6 space-y-6">
          <div>
            <InputLabel htmlFor="current_password" value="Current Password" className="text-gray-700 dark:text-gray-300 font-medium" />
            <div className="mt-1 relative rounded-md shadow-sm">
              <TextInput
                id="current_password"
                ref={currentPasswordInput}
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                autoComplete="current-password"
              />
            </div>
            <InputError message={errors.current_password} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password" value="New Password" className="text-gray-700 dark:text-gray-300 font-medium" />
            <div className="mt-1 relative rounded-md shadow-sm">
              <TextInput
                id="password"
                ref={passwordInput}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                autoComplete="new-password"
              />
            </div>
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700 dark:text-gray-300 font-medium" />
            <div className="mt-1 relative rounded-md shadow-sm">
              <TextInput
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                autoComplete="new-password"
              />
            </div>
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          {data.password && data.password.length > 0 && (
            <div className="rounded-md bg-gray-50 dark:bg-gray-900/50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Password Strength</h3>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Use at least 8 characters</li>
                      <li>Include uppercase and lowercase letters</li>
                      <li>Include numbers and special characters</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <PrimaryButton
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800"
              disabled={processing}
            >
              {processing ? 'Updating...' : 'Update Password'}
            </PrimaryButton>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4 mr-1" />
                Password updated
              </div>
            </Transition>
          </div>
        </form>
      </div>
    </section>
  );
}
