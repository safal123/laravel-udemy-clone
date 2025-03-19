import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Input } from '@/Components/ui/input'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect } from 'react'

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('register'))
  }

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
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')",
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
              Join Our Learning Community
            </h2>
            <p className="text-lg mb-10 text-slate-300 leading-relaxed">
              Create your account today and get access to thousands of courses from industry experts.
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-4 mt-0.5">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">Personalized Learning</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Get course recommendations tailored to your skills and interests.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-4 mt-0.5">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">Achievement Tracking</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Track your progress and showcase your completed courses.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-4 mt-0.5">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">Community Support</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Connect with peers and instructors through course communities.</p>
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
        <Head title="Register" />

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create your account</h2>
            <p className="text-slate-500">
              Fill in the details below to get started
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <InputLabel htmlFor="name" value="Full Name" className="text-slate-700 font-medium" />
              <TextInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                autoComplete="name"
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="email" value="Email address" className="text-slate-700 font-medium" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                autoComplete="username"
                onChange={(e) => setData('email', e.target.value)}
                required
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-medium" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                required
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-slate-700 font-medium" />
              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
              />
              <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div>
              <PrimaryButton
                className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-md text-white font-medium shadow-sm transition-all duration-200"
                disabled={processing}
              >
                {processing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </PrimaryButton>
            </div>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href={route('login')} className="font-medium text-emerald-600 hover:text-emerald-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
