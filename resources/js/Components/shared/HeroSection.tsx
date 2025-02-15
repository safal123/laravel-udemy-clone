import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">Unlock</span>
            <span className={'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'}>Your Potential</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto font-semibold leading-relaxed tracking-wide"
          >
            Join thousands of learners worldwide and master the skills you need to succeed in today's digital world.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center space-x-4"
          >
            <Button className="bg-orange-400 hover:bg-orange-500 text-orange-50">
              Get Started
            </Button>
            <Button
              variant={'outline'}
            >
              Explore Courses
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
