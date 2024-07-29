import React, {useEffect} from "react";
import {Head, Link, usePage} from "@inertiajs/react";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";
import {Course, PageProps} from "@/types";
import ReactPlayer from "react-player";
import {toast, Toaster} from "sonner";
import { router } from '@inertiajs/react'
import { Inertia } from "@inertiajs/inertia";
import {Loader} from "lucide-react";

const Index = ({auth}: PageProps) => {
  const course = usePage().props.course as Course
  const [loading, setLoading] = React.useState<boolean>(true)

  const checkUserPurchase = async () => {
    try {
      if (!auth.user) {
        window.location.href = route('login')
        return
      }
      const hasPurchased = auth?.user &&
        auth?.user.purchased_courses?.some((c: Course) => c.id === course.id) || false

      if (!hasPurchased) {
        setTimeout(() => {
            const link = route('payment.show', {
              course: course.id,
              price: course.price
            })
          return router.replace(link)
        }, 1000); // Delay navigation to allow spinner visibility
      } else {
        setLoading(false)
      }

    } catch (e) {
      console.log(e)
      setLoading(false)
    } finally {
      console.log('Finally')
    }
  }
  useEffect(() => {
    console.log('Checking user purchase', loading)
    checkUserPurchase()
  }, [])

  if (loading) {
    return <div className={'flex justify-center items-center h-screen bg-gray-400'}>
      <Loader size={64} className={'text-gray-800 animate-spin'}/>
    </div>
  }
  return (
    <div>
      <Toaster
        position={'top-right'}
      />
      <Head title="Udemy Clone"/>
      <div className={'flex'}>
        {/*Left Section fixed*/}
        <div className={'hidden lg:block w-64 h-[calc(100vh-56px)] fixed overflow-y-auto border-r'}>
          <div className={'fixed w-64 flex flex-col border-b bg-white p-1'}>
            <img src={course.image_url} alt={course.title} className={'w-full h-32 object-cover rounded-md'}/>
            <div className={'p-4'}>
              <h1 className={'text-lg font-bold text-gray-700'}>
                {course.title}
              </h1>
              <p className={'text-sm text-gray-500'}>
                {course.author?.name || 'Unknown'}
              </p>
            </div>
          </div>
          <div className={'mt-[217px]'}>
            {course.chapters.map((chapter, index) => (
              <div key={index} className={'border-b p-4 cursor-pointer hover:bg-gray-100'}>
                <Link href={`/courses/${course.id}/${chapter.id}`}>
                  <h1 className={'text-lg font-bold text-gray-700'}>
                    {chapter.title}
                  </h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/*Right Section*/}
        <div className={'lg:ml-64 lg:w-[calc(100%-224px)] w-full min-h-screen'}>
          <HomePageNavbar auth={auth}/>
          <div className={'aspect-video'}>
            <ReactPlayer
              url={course.chapters[0].video_url}
              controls
              loop={true}
              pip={true}
              width={'100%'}
              height={'calc(100vh-100px)'}
              onEnded={() => toast('Video ended')}
              onError={() => toast('Error playing video')}
              className={'aspect-video'}
            />
          </div>
        </div>
      </div>
    </div>
    );
}

export default Index;
