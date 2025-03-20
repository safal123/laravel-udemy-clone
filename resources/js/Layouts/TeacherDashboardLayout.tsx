import DashboardLayout, { DashboardLayoutProps } from './DashboardLayout'
import React from 'react'

interface TeacherDashboardLayoutProps extends Omit<DashboardLayoutProps, 'variant'> { }

export default function TeacherDashboardLayout({ title, children, breadcrumbs }: TeacherDashboardLayoutProps) {
  return (
    <DashboardLayout
      title={title}
      children={children}
      breadcrumbs={breadcrumbs}
      variant="teacher"
    />
  )
}
