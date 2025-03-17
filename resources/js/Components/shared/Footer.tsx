import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Facebook, Instagram, Linkedin, Mail, MapPin, PhoneCall, Send, Twitter } from 'lucide-react'
import Logo from '@/Components/shared/Logo'
import { Link } from '@inertiajs/react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-8 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              We're dedicated to transforming education through cutting-edge online learning experiences, helping students worldwide achieve their career goals.
            </p>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-orange-500 hover:bg-slate-800 rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-orange-500 hover:bg-slate-800 rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-orange-500 hover:bg-slate-800 rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-orange-500 hover:bg-slate-800 rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center">
                  <span className="mr-2 text-orange-500">›</span> Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center">
                  <span className="mr-2 text-orange-500">›</span> Become an Instructor
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center">
                  <span className="mr-2 text-orange-500">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center">
                  <span className="mr-2 text-orange-500">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center">
                  <span className="mr-2 text-orange-500">›</span> Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-slate-400 text-sm">123 Education Street, Learning Valley, CA 94043, USA</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneCall className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-slate-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-slate-400 text-sm">support@eduplatform.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for the latest updates on new courses and promotions.</p>
            <div className="relative flex items-center">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-slate-800 border-slate-700 text-slate-200 focus-visible:ring-orange-500 h-10 w-full pr-12 py-0"
              />
              <Button
                className="h-full absolute right-0 inset-y-0 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 rounded-l-none rounded-r-md flex items-center justify-center w-10 m-0 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-10" />

        {/* Copyright and Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} EduPlatform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-500 hover:text-orange-500 text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-orange-500 text-sm">Terms of Service</Link>
            <Link href="/cookies" className="text-slate-500 hover:text-orange-500 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
