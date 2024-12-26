import React from "react";
import {Head, Link, usePage} from "@inertiajs/react";
import {Course, PageProps} from "@/types";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";
import {Button} from "@/Components/ui/button";
import {Badge} from "@/Components/ui/badge";
import {
  AudioLines,
  BookAIcon,
  CheckCircle2Icon,
  ChevronLeft,
  CircleDollarSign,
  Clock,
  LockIcon,
  SaveIcon,
  VideoIcon
} from "lucide-react";

const Index = ({auth}: PageProps) => {
  const course = usePage().props.course as Course
  const hasPurchased = auth.user?.purchased_courses?.some((c: Course) => c.id === course.id)
  return (
    <div>
      <Head title={course.title}/>
      <HomePageNavbar auth={auth}/>
      <div className={"bg-gray-900 min-h-[calc(100vh-64px)] pt-2"}>
        <div className={"container mx-auto"}>
          <div className={"flex gap-4 flex-col-reverse pb-10 text-white lg:flex-row lg:justify-center"}>
            <div
              className={"md:sticky xl:top-[40px] lg:self-start flex flex-col gap-4 min-w-[300px] lg:min-w-[310px]"}>
              <div
                className={"bg-gray-800 relative transition-colors duration-300 rounded-xl px-5 flex items-center justify-between w-full py-3"}>
                <h1 className={"text-gray-300 font-semibold"}>
                  Your Instructor
                </h1>
                <Link href={`/browse/instructors/${course.author?.id}`}>
                  <p className={"text-white text-xl font-bold hover:underline"}>
                    {course.author.name}
                  </p>
                </Link>
              </div>
              <div className={'relative lg:max-w-sm flex flex-1 overflow-hidden rounded-xl'}>
                <img
                  src={course.image_url}
                  alt={course.author.name}
                  className={"mx-auto w-full lg:object-cover lg:h-[445px]"}
                />
              </div>
            </div>
            <div className={"flex-1 space-y-4"}>
              <div className="w-full mx-auto p-6 bg-gray-800 rounded-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    size={'sm'}
                    className="text-blue-400 text-sm hover:underline rounded-full">
                    <ChevronLeft size={16} className="mr-2"/>
                    Browse All Series
                  </Button>
                  <Badge
                    className="border border-red-900 bg-red-900 text-red-100 cursor-pointer hover:bg-red-100 hover:text-red-900">
                    Frameworks
                  </Badge>
                </div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">
                    {course.title}
                  </h1>
                  <p className="text-sm text-gray-400 mb-4">
                    Last Updated:
                    <Badge className="ml-2">
                      {course.updated_at}
                    </Badge>
                  </p>
                  <p className="text-gray-300">
                    {course.description}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  {hasPurchased &&
                    <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                      <Button className="rounded-xl bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
                        <VideoIcon size={16} className="mr-2"/>
                        <span className="flex items-center gap-2">
                        Continue Series
                      </span>
                      </Button>
                    </Link>
                  }
                  <Button className={'rounded-xl'}>
                    <SaveIcon size={16} className="mr-2"/>
                    Add to Watchlist
                  </Button>
                  {!hasPurchased && (
                    <Button
                      className='rounded-xl md:ml-auto bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 hover:from-emerald-800 hover:via-slate-800 hover:to-rose-800'>
                      <CircleDollarSign size={16} className="mr-2"/>
                      <span className={'font-semibold'}>
                        Pay ${course.price} and get access to all chapters
                      </span>
                    </Button>
                  )}
                </div>
              </div>
              <div className="w-full mb-12 mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
                <div className="flex flex-col md:flex-row items-center md:justify-between">
                  <div className="flex items-center w-full justify-between md:justify-start gap-2">
                    <div className={"flex items-center gap-1"}>
                      <BookAIcon size={12}/>
                      <span className="text-sm">
                        5 Lessons
                      </span>
                    </div>
                    <div className={"flex items-center gap-1"}>
                      <Clock size={12}/>
                      <span className="text-sm">
                      2 hours 30 minutes
                    </span>
                    </div>
                    <div className={"xl:flex gap-1 items-center hidden"}>
                      <AudioLines size={12}/>
                      <span className="text-sm">
                      Level: Intermediate
                    </span>
                    </div>
                  </div>
                  <div className={"flex justify-between md:justify-end gap-2 items-center w-full"}>
                    <Button>
                      <Clock size={16} className="mr-2"/>
                      Reset Progress
                    </Button>
                    <Button>
                      <CheckCircle2Icon size={16} className="mr-2"/>
                      Mark as Complete
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto">
                <div className={"flex flex-col gap-2"}>
                  {course.chapters.map((chapter, index) =>
                    <div className={"flex bg-gray-800 p-6 items-center gap-4 rounded-lg shadow-md text-white"}
                         key={index}>
                      <div className={"bg-gray-900 flex items-center justify-center w-12 h-12 rounded-full"}>
                        <span className="text-white text-lg">
                          {index + 1}
                        </span>
                      </div>
                      <div className={"flex flex-col"}>
                        <h1 className="text-lg font-semibold">
                          {chapter.title}
                        </h1>
                        <p className="text-gray-400 truncate">
                          {chapter.description}
                        </p>
                      </div>
                      <div className={"ml-auto"}>
                        <div className={"flex items-center gap-2 bg-gray-900 p-2 rounded-full"}>
                          <LockIcon size={16} className="text-red-500"/>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Index;
