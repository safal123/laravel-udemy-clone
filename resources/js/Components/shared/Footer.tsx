import { Button } from '@/Components/ui/button'
import { Facebook, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white">Your Company</h2>
          <p className="mt-2 text-sm text-gray-400">
            Building solutions that make a difference.
          </p>
          <p className="mt-4 text-sm text-gray-400">&copy; 2025 Your Company. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <p className="mt-4 text-sm text-gray-400">
            Stay connected with us on social media.
          </p>
          <div className="mt-4 flex space-x-4">
            <Button variant="secondary" size="icon" className="hover:text-white">
              <Facebook className="h-5 w-5"/>
            </Button>
            <Button variant="secondary" size="icon" className="hover:text-white">
              <TwitterIcon className="h-5 w-5"/>
            </Button>
            <Button variant="secondary" size="icon" className="hover:text-white">
              <LinkedinIcon className="h-5 w-5"/>
            </Button>
            <Button variant="secondary" size="icon" className="hover:text-white">
              <InstagramIcon className="h-5 w-5"/>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
