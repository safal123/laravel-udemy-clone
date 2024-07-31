import TeacherDashboardLayout from "@/Layouts/TeacherDashboardLayout";
import Table from "@/Components/shared/table/Table";
import {Link, usePage} from "@inertiajs/react";
import {Button} from "@/Components/ui/button";
import {Course, PaginatedData} from "@/types";
import Pagination from "@/Components/shared/pagination/Pagination";

const Index = () => {
  const {courses} = usePage<{
    courses: PaginatedData<Course>;
  }>().props;

  const {
    data,
    meta: {links}
  } = courses;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        {/*<FilterBar />*/}
        <Link
          className="focus:outline-none"
          href={route('teachers.courses.create')}
        >
          <Button>
            Add new course
          </Button>
        </Link>
      </div>
      <Table
        columns={[
          {
            label: 'Title',
            name: 'title',
            renderCell: (row: any) => (
              <Link href={route('teachers.courses.edit', row.id)} className="text-blue-500 hover:underline">
                {row.title}
              </Link>
            )
          },
          {
            label: 'Price',
            name: 'price',
            renderCell: (row: any) => (
              <div className={`px-2 py-1 text-medium font-semibold text-gray-700 rounded-full`}>
                ${row.price}
              </div>
            )
          },
          {
            label: 'Status',
            name: 'status',
            colSpan: 2,
            renderCell: (row: any) => (
              <div
                className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${row.is_published ? 'bg-green-500' : 'bg-red-500'}`}>
                {row.is_published ? 'Published' : 'Draft'}
              </div>
            )
          }
        ]}
        rows={data}
        getRowDetailsUrl={(row: any) => route('teachers.courses.edit', row.id)}
      />
      <Pagination links={links}/>
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>;

export default Index;
