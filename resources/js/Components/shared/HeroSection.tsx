import { Button } from '@/Components/ui/button'
import React from "react";

const HeroSection = () => {
  return (
    <div className="border-gray-800 rounded-lg relative text-white min-h-[calc(100vh-40%)]">
      <svg
        className="absolute inset-0 h-full w-full rounded-md overflow-y-auto"
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
      <div className="max-w-7xl mx-auto py-16 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4">
            Empower Your Learning Platform
            <br />
            <span className="text-blue-400">with Simplicity</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 mb-6">
            Build an interactive and engaging LMS that brings your courses,
            chapters, and certifications into one place for your users.
          </p>
          <div className="flex gap-4">
            <Button>
              Get Started for Free
            </Button>
            <Button variant="secondary">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Content */}
        <div className="mt-10 lg:mt-0 w-full lg:w-1/2 relative overflow-y-auto">
          <div className="relative z-10">
            {/* API Code Sample */}
            <div className="bg-gray-800 text-gray-200 rounded-lg p-6 shadow-lg">
              <code className="text-sm">
                <span className="block text-blue-400">$ curl --request POST</span>
                <span className="block">
                  --url 'https://api.yourlms.com/v1/course/create' \
                </span>
                <span className="block">
                  --header 'Authorization: Bearer YOUR_API_KEY' \
                </span>
                <span className="block">
                  --data '{`{ "title": "React Basics", "published": true }`}'
                </span>
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
