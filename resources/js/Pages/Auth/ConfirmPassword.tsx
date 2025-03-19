import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.confirm'));
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
            backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072')",
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
              Secure Area Confirmation
            </h2>
            <p className="text-lg mb-10 text-slate-300 leading-relaxed">
              You're accessing a protected area. Please confirm your password to continue.
            </p>

            {/* Security Notes */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-4 mt-0.5">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V8m-3 5h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">Enhanced Security</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">We require password confirmation for sensitive areas to better protect your account.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-emerald-500/20 rounded-full p-2 mr-4 mt-0.5">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">Protecting Your Data</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Your privacy is important to us, and this extra step helps keep your information secure.</p>
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
        <Head title="Confirm Password" />

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Confirm your password</h2>
            <p className="text-slate-500">
              This is a secure area of the application. Please confirm your password before continuing.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-medium" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                isFocused={true}
                onChange={(e) => setData('password', e.target.value)}
              />
              <InputError message={errors.password} className="mt-2" />
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
                    Confirming...
                  </span>
                ) : (
                  "Confirm Password"
                )}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
