import { Button } from '@/Components/ui/button'
import { Head, Link } from '@inertiajs/react'

export default function ErrorPage({ status }: { status: number }) {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
  }[status]

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[status]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Head title={title} />
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-indigo-500 animate-pulse">{title}</h1>
        <p className="text-lg mb-8 text-gray-300">{description}</p>
        <div className="mt-4">
          <Link href="/">
           <Button
              className="bg-indigo-500 hover:bg-indigo-600"
           >Go Home</Button>
          </Link>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#1a2048"
          fillOpacity="1"
          d="M0,192L48,186.7C96,181,192,171,288,144C384,117,480,75,576,85.3C672,96,768,160,864,176C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  )
}
