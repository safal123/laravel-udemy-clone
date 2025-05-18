import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import HomePageNavbar from '@/Components/shared/HomePageNavbar';

interface PaymentSuccessProps extends PageProps {
  course?: {
    id: number;
    title: string;
    slug: string;
  };
}

const PaymentSuccess = ({ auth, course }: PaymentSuccessProps) => {
  console.log(course);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Head title="Payment Successful" />

      {/* Navbar */}
      <HomePageNavbar auth={auth} />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full mx-auto bg-slate-900 rounded-xl shadow-xl overflow-hidden p-8 border border-slate-800">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Success icon */}
            <div className="flex-shrink-0 bg-green-900/20 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            {/* Success message */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
              <p className="text-slate-400">
                Your transaction has been completed successfully. Thank you for your purchase.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col w-full space-y-3 pt-2">
              <Link href={route('dashboard')}>
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Go to Dashboard
                </Button>
              </Link>

              {course && (
                <Link href={route('learn.index', { slug: course.slug })}>
                  <Button variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white">
                    View Course
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400 text-sm">
                Need help? Contact <a href="mailto:support@example.com" className="text-orange-500 hover:text-orange-400">support@example.com</a>
              </p>
            </div>
            <div className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentSuccess;
