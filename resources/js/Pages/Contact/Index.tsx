import { Head } from "@inertiajs/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import { motion } from "framer-motion";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit us",
    details: "123 Education Street, Learning Valley, CA 94043",
    description: "Come say hello at our office HQ"
  },
  {
    icon: Phone,
    title: "Call us",
    details: "+1 (555) 123-4567",
    description: "Mon-Fri from 8am to 5pm"
  },
  {
    icon: Mail,
    title: "Email us",
    details: "support@learningplatform.com",
    description: "We'll respond within 24 hours"
  },
  {
    icon: Clock,
    title: "Working hours",
    details: "Monday to Friday",
    description: "9:00 AM - 6:00 PM (EST)"
  }
];

export default function Contact({ auth }: { auth: any }) {
  return (
    <AppLayout>
      <Head title="Contact Us" />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-white/80">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 rounded-2xl opacity-10 blur-xl" />
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-emerald-900/10">
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name</label>
                      <Input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name</label>
                      <Input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Subject</label>
                    <Input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message</label>
                    <Textarea
                      placeholder="Your message..."
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900/20 min-h-[150px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 text-white py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 bg-clip-text text-transparent">
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-1 gap-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    key={item.title}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                    <div className="relative bg-white p-6 rounded-xl border border-emerald-900/10 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative p-3 rounded-lg bg-gradient-to-br from-emerald-900 via-slate-900 to-rose-900 text-white inline-block">
                          <item.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-slate-700 group-hover:text-emerald-900 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-900 font-medium mb-1">{item.details}</p>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
