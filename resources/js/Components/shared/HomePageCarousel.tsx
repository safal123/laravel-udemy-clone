import {EmblaOptionsType} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const OPTIONS: EmblaOptionsType = {align: 'end', loop: true}

type HomePageCarouselProps = {
  courses: {
    id: number,
    title: string,
    imageUri: string
  }[]
}

const HomePageCarousel = ({ courses }: HomePageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel (OPTIONS, [Autoplay ()])
  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden rounded-xl" ref={ emblaRef }>
      <div className={"flex"}>
        { courses.map ((course) => (
          <figure key={course.id} className={"relative flex h-[400px] md:h-[500px] aspect-square w-full flex-none cursor-pointer flex-col justify-end rounded-xl border-none"}>
            <img
              src={ course.imageUri }
              alt={ course.title }
              className={"absolute size-full rounded-xl border-none object-cover"}
            />
            <div className={ 'absolute inset-0 bg-gradient-to-r from-transparent to-black' }>
              <div className={ 'flex flex-col items-center justify-center h-full text-white' }>
                <h1 className={"text-xl font-medium mb-4"}>
                  {course.title}
                </h1>
                <div className={'w-fit'}>
                  <button className={"px-4 py-2 bg-blue-600 text-white rounded-md"}>
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </figure>
        )) }
      </div>
    </section>
  )
}

export default HomePageCarousel;
