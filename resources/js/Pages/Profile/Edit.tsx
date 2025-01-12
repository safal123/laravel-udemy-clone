import DashboardLayout from '@/Layouts/DashboardLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import DeleteUserForm from './Partials/DeleteUserForm'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'

export default function Edit({auth, mustVerifyEmail, status}: PageProps<{
  mustVerifyEmail: boolean,
  status?: string
}>) {
  return (
    <DashboardLayout>
      <Head title="Profile"/>
      <div className="">
        <div className="w-full mx-auto sm:px-6 space-y-6">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl"/>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <DeleteUserForm className="max-w-xl"/>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
