import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Column - Image and Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 opacity-95"></div>

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070')",
            backgroundBlendMode: 'overlay'
          }}
        ></div>

        {/* Content */}
        <div className="relative p-12 flex flex-col h-full z-10">
          {/* Logo Area */}
          <div className="mb-10">
            <div className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1 className="text-2xl font-bold text-white tracking-tight">LearnHub</h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="my-auto max-w-lg">
            <h2 className="text-4xl font-bold mb-6 text-white tracking-tight leading-tight">
              Just One More Step
            </h2>
            <p className="text-lg mb-10 text-slate-300 leading-relaxed">
              Please verify your email address to access all the features of your account and start your learning journey.
            </p>

            {/* Benefits List */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-4 mt-0.5">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">Secure Your Account</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Email verification helps protect your account from unauthorized access.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-4 mt-0.5">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">Unlock Full Access</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Get access to all premium features and courses after verification.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-slate-400 flex items-center space-x-4">
            <span>© 2023 LearnHub</span>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16">
          <div className="w-64 h-64 rounded-full bg-emerald-500/10"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16">
          <div className="w-80 h-80 rounded-full bg-indigo-600/10"></div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <Head title="Email Verification" />

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Verify your email</h2>
            <p className="text-slate-500">
              Check your inbox for the verification link
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
            <p className="text-slate-600 text-sm mb-6">
              Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </p>

            {status === 'verification-link-sent' && (
              <div className="mb-6 p-4 rounded-md bg-emerald-50 border border-emerald-200">
                <p className="text-sm text-emerald-700 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  A new verification link has been sent to the email address you provided during registration.
                </p>
              </div>
            )}

            <form onSubmit={submit} className="mt-6">
              <div className="flex items-center justify-between space-x-4">
                <PrimaryButton
                  className="flex-1 flex justify-center py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-md text-white font-medium shadow-sm transition-all duration-200"
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Resend Verification Email"
                  )}
                </PrimaryButton>

                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                  Log Out
                </Link>
              </div>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Need help? <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
