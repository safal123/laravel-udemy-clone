import { Button } from '@/Components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/Components/ui/dialog'
import CheckoutForm from '@/Pages/Payment/Partials/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { CreditCard, Lock, ShieldCheck, Loader2 } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface PaymentModalProps {
  course: any
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const PaymentModal = ({ course }: PaymentModalProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [clientSecret, setClientSecret] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('enroll') === 'true') {
      buttonRef.current?.click()
      fetchClientSecret()
    }
  }, [])

  const fetchClientSecret = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(route('payment.client-secret'), {
        params: { course: course.id }
      })

      setClientSecret(response.data.clientSecret)
    } catch (err: any) {
      console.error('Error fetching payment intent:', err)
      setError(err?.response?.data?.message || 'Unable to initialize payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [course])

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          ref={buttonRef}
          className="w-full mt-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
          size="lg"
          onClick={() => {
            setOpen(true)
            fetchClientSecret()
          }}>
          <CreditCard className="w-5 h-5 mr-2" />
          Enroll Now
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-xl md:max-w-2xl rounded-xl p-0">
        {/* Fixed Header */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-xl">
          <div className="p-6 flex items-center justify-between relative">
            <DialogTitle className="text-2xl font-bold flex items-center">
              <ShieldCheck className="w-6 h-6 mr-2 text-green-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-900">
                Secure Checkout
              </span>
          </DialogTitle>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="bg-white rounded-lg mb-6">
            {loading || !clientSecret ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-slate-100 rounded-full p-3 mb-4">
                  <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                </div>
                <h4 className="font-medium text-slate-800 mb-1">Preparing Your Payment</h4>
                <p className="text-sm text-slate-600">This will only take a moment...</p>
              </div>
            ) : (
              <Elements stripe={stripePromise} options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#f97316', // orange-500
                    colorBackground: '#ffffff',
                    colorText: '#0f172a', // slate-900
                    borderRadius: '6px',
                  }
                }
              }}>
                <CheckoutForm course={course} />
              </Elements>
            )}
          </div>
          <div className="mb-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <span className="text-sm font-semibold text-slate-600">COURSE DETAILS</span>
              </div>
              {course.chapters && (
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                  {course.chapters.length} {course.chapters.length === 1 ? 'Chapter' : 'Chapters'}
                </span>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start gap-5">
                {/* Course Image with Overlay */}
                <div className="relative flex-shrink-0">
                  {course.image_url ? (
                    <div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-lg shadow-md group">
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                        <span className="text-xs text-white font-medium">Preview</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  )}

                  {/* If there is a badge for bestseller or popular, we can add it here */}
                  {course.isBestseller && (
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm transform rotate-12">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                      {course.title}
                    </span>
                  </h3>

                  {/* Instructor and Ratings Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-slate-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span className="text-sm font-medium text-slate-700">
                        {course.instructor?.name || 'Expert Instructor'}
                      </span>
                    </div>

                    {course.rating && (
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${star <= Math.round(course.rating) ? 'text-amber-400' : 'text-slate-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1.5 text-xs font-semibold text-slate-700">{course.rating.toFixed(1)}</span>

                        {course.reviewCount && (
                          <span className="text-xs text-slate-500 ml-1">({course.reviewCount})</span>
                        )}
                      </div>
                    )}

                    {/* We can add additional badges here */}
                    {course.level && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {course.level}
                      </span>
                    )}
                  </div>

                  {/* Course Brief Details */}
                  <div className="grid grid-cols-2 gap-2 mt-1 mb-3">
                    {course.duration && (
                      <div className="flex items-center text-xs text-slate-600">
                        <svg className="w-3.5 h-3.5 text-slate-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </div>
                    )}

                    {course.lastUpdated && (
                      <div className="flex items-center text-xs text-slate-600">
                        <svg className="w-3.5 h-3.5 text-slate-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Last updated: {course.lastUpdated}
                      </div>
                    )}

                    {course.language && (
                      <div className="flex items-center text-xs text-slate-600">
                        <svg className="w-3.5 h-3.5 text-slate-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        {course.language}
                      </div>
                    )}

                    {course.studentsEnrolled && (
                      <div className="flex items-center text-xs text-slate-600">
                        <svg className="w-3.5 h-3.5 text-slate-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {course.studentsEnrolled} students
                      </div>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center mt-2">
                    <div className="mr-3">
                      <div className="text-2xl font-bold text-orange-600 flex items-baseline">
                        {course.price ? formatPrice(course.price) : 'Free'}
                        {course.original_price && course.original_price > course.price && (
                          <span className="text-sm text-slate-500 line-through ml-2 font-normal">
                            {formatPrice(course.original_price)}
                          </span>
                        )}
                      </div>

                      {course.original_price && course.original_price > course.price && (
                        <div className="text-xs font-medium text-green-600 mt-0.5">
                          Save {Math.round(100 - (course.price / course.original_price * 100))}% today
                        </div>
                      )}
                    </div>

                    {/* Limited Time Offer Tag */}
                    {course.limitedTimeOffer && (
                      <div className="bg-orange-100 border border-orange-200 px-2 py-1 rounded text-xs font-medium text-orange-700 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Limited time offer
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Benefits Section */}
          <div className="mb-8 p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="mr-3 p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Premium Access Benefits
              </h3>
            </div>

            <p className="text-slate-300 mb-4 text-sm">
              Get complete access to <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">{course.title}</span> and unlock your potential today.
            </p>

            <ul className="space-y-3 mt-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <span className="text-white font-medium">Lifetime Access</span>
                  <p className="text-slate-400 text-sm">All {course.chapters?.length || 'course'} chapters with unlimited access</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <span className="text-white font-medium">Course Resources</span>
                  <p className="text-slate-400 text-sm">All downloadable materials and code samples</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <span className="text-white font-medium">30-Day Guarantee</span>
                  <p className="text-slate-400 text-sm">Full money-back guarantee if you're not satisfied</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Payment Form */}

        </div>

        {/* Fixed Footer */}
        <div className="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 rounded-b-xl">
          <DialogFooter className="p-6">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-slate-600">
                Questions? <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">Contact support</a>
      </div>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
              >
            Cancel
          </Button>
            </div>
      </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
)
}

export default PaymentModal
