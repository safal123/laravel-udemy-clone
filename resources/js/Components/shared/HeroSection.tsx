import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Extend PageProps interface to include the expected properties
interface HeroSectionProps extends PageProps {
  totalCourses: number;
  totalStudents: number;
  totalRatings: number;
}

export default function HeroSection() {
  const { totalCourses, totalStudents, totalRatings } = usePage<HeroSectionProps>().props;
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const features = [
    "Expert-led video courses",
    "Hands-on projects",
    "Verified certificates",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 md:py-28 lg:py-32 max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            className="w-full lg:w-5/12 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-block bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-1 rounded-full text-orange-200 font-medium text-sm mb-6"
            >
              The #1 Learning Platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
            >
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text block md:inline">Master New Skills</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text block md:inline">Advance Your Career</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Join over 50,000 learners who have transformed their careers with our industry-leading courses taught by real-world experts.
            </motion.p>

            {/* Feature List */}
            <motion.ul variants={fadeInUp} className="mb-8 space-y-3 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-slate-200">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* Call-to-Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-medium px-6">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-orange-300/30 text-orange-100 hover:bg-white/20 hover:text-white hover:border-orange-300/50 transition-all px-6 relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Courses</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 group-hover:opacity-100 opacity-0 transition-opacity"></span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex space-x-10 justify-center lg:justify-start max-w-2xl mx-auto lg:mx-0 border-t border-slate-700/50 pt-6"
            >
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">{totalCourses}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Courses</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{totalStudents}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Students</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">{totalRatings}/5</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="w-full lg:w-1/2 mt-12 lg:mt-0"
          >
            <div className="relative mx-auto max-w-md lg:max-w-full">
              {/* Decorative elements */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-[64px] opacity-20 animate-blob"></div>
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-[64px] opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full filter blur-[84px] opacity-30"></div>

              {/* Main image with decorative border */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1.5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] ring-1 ring-slate-700/50 lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="Learning Platform Dashboard"
                  className="rounded-xl w-full h-auto object-cover shadow-lg transform hover:scale-[1.01] transition-transform"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-6 sm:-bottom-6 -right-2 sm:-right-6 bg-white text-slate-900 px-3 sm:px-5 py-2 sm:py-3 rounded-xl shadow-lg font-bold text-xs sm:text-sm lg:text-base">
                  <span className="text-orange-500 font-bold">30-Day</span> Money Back Guarantee
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
