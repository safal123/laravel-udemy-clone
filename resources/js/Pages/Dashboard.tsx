import DashboardLayout from '@/Layouts/DashboardLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'

export default function Dashboard({auth}: PageProps) {
  return (
    <DashboardLayout>
      <Head title="Student Dashboard"/>

      <div className="p-2">
        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
      </div>
    </DashboardLayout>
  );
}
