import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import { Input } from '@/Components/ui/input'
import { PageProps } from '@/types'
import { Transition } from '@headlessui/react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { Check, User, Mail, AlertCircle } from 'lucide-react'

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: {
  mustVerifyEmail: boolean,
  status?: string,
  className?: string
}) {
  const user = usePage<PageProps>().props.auth.user

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <header className="pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <User className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-500" />
            Profile Information
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Update your account's profile information and email address.
          </p>
        </header>

        <form onSubmit={submit} className="mt-6 space-y-6">
          <div>
            <InputLabel htmlFor="name" value="Name" className="text-gray-700 dark:text-gray-300 font-medium" />
            <div className="mt-1 relative rounded-md shadow-sm">
              <Input
                id="name"
                type="text"
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <InputError className="mt-2" message={errors.name} />
          </div>

          <div>
            <InputLabel htmlFor="email" value="Email" className="text-gray-700 dark:text-gray-300 font-medium" />
            <div className="mt-1 relative rounded-md shadow-sm">
              <Input
                id="email"
                type="email"
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <InputError className="mt-2" message={errors.email} />
          </div>

          {mustVerifyEmail && user.email_verified_at === null && (
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Your email address is unverified.
                    <Link
                      href={route('verification.send')}
                      method="post"
                      as="button"
                      className="ml-1 font-medium text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
                    >
                      Click here to re-send the verification email.
                    </Link>
                  </p>

                  {status === 'verification-link-sent' && (
                    <div className="mt-2 flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                      <Check className="w-4 h-4 mr-1" />
                      A new verification link has been sent to your email address.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <PrimaryButton
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800"
              disabled={processing}
            >
              {processing ? 'Saving...' : 'Save Changes'}
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
                Saved successfully
              </div>
            </Transition>
          </div>
        </form>
      </div>
    </section>
  );
}
