import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'

const Index = ({ auth }: PageProps) => {
  return (
    <div>
      <HomePageNavbar auth={auth}/>
      <Head title="Course" />
    </div>
  )
}

export default Index
