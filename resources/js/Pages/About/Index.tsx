import { Head } from "@inertiajs/react";
import { Building2, Users2, Target, Award, BookOpen, Globe2, Rocket, Trophy } from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import { motion } from "framer-motion";
import HomePageNavbar from "@/Components/shared/HomePageNavbar";

const features = [
  {
    icon: Building2,
    title: "Our Mission",
    description:
      "To democratize education by offering affordable, high-quality online courses that empower individuals to achieve their personal and professional goals.",
  },
  {
    icon: Users2,
    title: "Our Team",
    description:
      "Comprising seasoned educators, innovative technologists, and industry leaders, our team is dedicated to reshaping the future of online learning.",
  },
  {
    icon: Target,
    title: "Our Vision",
    description:
      "To be the foremost global platform for skill enhancement and career advancement, fostering a culture of lifelong learning.",
  },
  {
    icon: Award,
    title: "Our Values",
    description:
      "We prioritize integrity, creativity, diversity, and a commitment to excellence in all our educational endeavors.",
  },
  {
    icon: Globe2,
    title: "Global Impact",
    description:
      "Reaching learners in over 200 countries, we strive to make a positive impact on global education standards.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Continuously pushing the boundaries of technology to deliver cutting-edge learning experiences that inspire and engage.",
  },
];

const achievements = [
  {
    icon: BookOpen,
    title: "Active Courses",
    stat: "2,500+",
    description: "Expert-curated courses",
  },
  {
    icon: Users2,
    title: "Global Students",
    stat: "180K+",
    description: "From 165+ countries",
  },
  {
    icon: Award,
    title: "Success Rate",
    stat: "92%",
    description: "Course completion",
  },
  {
    icon: Trophy,
    title: "Top Instructors",
    stat: "450+",
    description: "Industry leaders",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "15+ years in EdTech",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "Former Tech Lead at Google",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Content",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "PhD in Education",
  },
];

export default function About() {
  return (
    <AppLayout>
      <Head title="About Us" />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-slate-900 py-32">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Transforming Education for the Digital Age
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                We're on a mission to make quality education accessible to everyone,
                everywhere. Join us in shaping the future of learning.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="py-24 bg-gradient-to-b from-white via-emerald-900/5 to-rose-900/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  key={feature.title}
                  className="group relative"
                >
                  {/* Soft Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                  {/* Card Content */}
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 h-full
                    hover:bg-gradient-to-br hover:from-white hover:to-emerald-900/5
                    transform hover:-translate-y-1
                    border border-emerald-900/10
                    shadow-sm hover:shadow-md hover:shadow-emerald-900/10">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative p-4 rounded-lg bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 text-white">
                        <feature.icon className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-700 group-hover:text-emerald-900 transition-colors duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-base text-slate-600/90 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-emerald-900 hover:text-rose-900 transition-colors duration-300">
                      Learn More
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300 opacity-70">→</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>


        {/* Achievements Section */}
        <div className="py-24 bg-gradient-to-b from-white via-emerald-900/5 to-rose-900/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 bg-clip-text text-transparent">
                Our Global Impact
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Transforming lives through education, one student at a time
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  key={item.title}
                  className="group relative"
                >
                  {/* Soft Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

                  {/* Card Content */}
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 h-full
                    hover:bg-gradient-to-br hover:from-white hover:to-emerald-900/5
                    transform hover:-translate-y-1
                    border border-emerald-900/10
                    shadow-sm hover:shadow-md hover:shadow-emerald-900/10">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative p-4 rounded-lg bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 text-white">
                        <item.icon className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 bg-clip-text text-transparent mb-3">
                      {item.stat}
                    </div>
                    <div className="text-lg font-semibold text-slate-700 mb-2 group-hover:text-emerald-900 transition-colors duration-300">
                      {item.title}
                    </div>
                    <div className="text-slate-600/90">
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
              <p className="text-xl text-slate-600">
                Dedicated professionals working together to revolutionize online education
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-12">
              {team.map((member, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={member.name}
                  className="text-center group"
                >
                  <div className="relative mb-6 inline-block">
                    <div className="w-48 h-48 rounded-full overflow-hidden mx-auto relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-primary/10 transform scale-110 -z-10" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-slate-600">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-slate-900 border-b">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of learners already transforming their careers with us
              </p>
              <a
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Explore Courses
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
