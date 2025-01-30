import { Button } from "@/Components/ui/button"; // shadcn/ui Button
import { motion } from "framer-motion"; // Framer Motion

export default function HeroSection() {
  // Animation variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_#4F46E5,_#6366F1,_#818CF8,_#A5B4FC,_#C7D2FE)]"></div>

      {/* Content */}
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
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of learners worldwide and master the skills you need to succeed in today's digital world.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center space-x-4"
          >
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Get Started
            </Button>
            <Button className={'bg-blue-600'}>
              Explore Coursess
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
