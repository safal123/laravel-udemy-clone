import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Facebook, Instagram, Linkedin, Mail, MapPin, PhoneCall, Send, Twitter } from 'lucide-react'
import Logo from '@/Components/shared/Logo'
import { Link } from '@inertiajs/react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-20 pb-10 border-t border-slate-800 relative">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
        </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              We're dedicated to transforming education through cutting-edge online learning experiences, helping students worldwide achieve their career goals.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" aria-label="Facebook"
                className="bg-slate-800 hover:bg-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter"
                className="bg-slate-800 hover:bg-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn"
                className="bg-slate-800 hover:bg-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram"
                className="bg-slate-800 hover:bg-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center after:content-[''] after:ml-3 after:flex-grow after:border-t after:border-slate-800 after:h-px">Quick Links</h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center group">
                  <span className="mr-2 text-orange-500 transition-transform duration-300 transform group-hover:translate-x-1">›</span>
                  <span className="group-hover:underline underline-offset-4">Browse Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center group">
                  <span className="mr-2 text-orange-500 transition-transform duration-300 transform group-hover:translate-x-1">›</span>
                  <span className="group-hover:underline underline-offset-4">Become an Instructor</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center group">
                  <span className="mr-2 text-orange-500 transition-transform duration-300 transform group-hover:translate-x-1">›</span>
                  <span className="group-hover:underline underline-offset-4">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center group">
                  <span className="mr-2 text-orange-500 transition-transform duration-300 transform group-hover:translate-x-1">›</span>
                  <span className="group-hover:underline underline-offset-4">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center group">
                  <span className="mr-2 text-orange-500 transition-transform duration-300 transform group-hover:translate-x-1">›</span>
                  <span className="group-hover:underline underline-offset-4">Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center after:content-[''] after:ml-3 after:flex-grow after:border-t after:border-slate-800 after:h-px">Contact Info</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3 group">
                <div className="bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-slate-400 text-sm leading-relaxed">123 Education Street, Learning Valley, CA 94043, USA</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <PhoneCall className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-slate-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-slate-400 text-sm">support@eduplatform.com</span>
            </li>
          </ul>
        </div>

          {/* Column 4: Newsletter */}
        <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center after:content-[''] after:ml-3 after:flex-grow after:border-t after:border-slate-800 after:h-px">Newsletter</h3>
            <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-lg border border-slate-700/50">
              <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for the latest updates on new courses and promotions.</p>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-slate-900/80 border-slate-700 text-slate-200 focus-visible:ring-orange-500/50 h-10 w-full pl-4 pr-12 py-0"
                />
                <Button
                  className="absolute right-[2px] top-[2px] bottom-[2px] bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 rounded-md flex items-center justify-center w-10 p-0 h-auto"
                >
                  <Send className="h-4 w-4" />
            </Button>
              </div>
              <p className="text-slate-500 text-xs mt-3">We respect your privacy. No spam emails.</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50 my-10" />

        {/* Copyright and Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} EduPlatform. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-500 hover:text-orange-500 text-sm transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-orange-500 text-sm transition-colors duration-300">Terms of Service</Link>
            <Link href="/cookies" className="text-slate-500 hover:text-orange-500 text-sm transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
