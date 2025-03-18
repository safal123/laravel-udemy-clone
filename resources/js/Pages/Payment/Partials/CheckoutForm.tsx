import { Button } from '@/Components/ui/button'
import { Course } from '@/types'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CreditCard, Lock, Loader2, Check, AlertCircle } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type CheckoutFormProps = {
  course: Course
}

const CheckoutForm = ({ course }: CheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPaymentError(null)

    try {
      setIsSubmitting(true)

      if (!stripe || !elements) {
        toast.error('Stripe.js has not loaded yet. Make sure to disable any ad blockers.')
        return
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/courses/${course.slug}`,
        },
      })

      if (error) {
        setPaymentError(error.message || 'Payment failed. Please try again.')
        throw error
      }

      toast.success('Payment successful')
    } catch (e: any) {
      toast.error(e.message || 'An error occurred', {
        style: {
          background: '#fa4931',
          color: '#fff',
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!stripe || !elements) {
    return (
      <div className="flex flex-col items-center justify-center h-72 text-slate-500">
        <Loader2 className="animate-spin w-10 h-10 mb-4 text-orange-500" />
        <p className="text-center">
          Loading payment form...<br />
          <span className="text-sm opacity-70">This will only take a moment</span>
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      {/* Payment Header */}
      <div className="px-4 py-5 border-b border-slate-200">
        <h3 className="text-xl font-bold mb-1">
          Complete Your Purchase
        </h3>
        <p className="text-slate-500 text-sm">
          Enter your payment details below to access <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">{course.title}</span>
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-slate-50 p-4 mb-2 rounded-md mx-4 mt-4 border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-700 font-medium">Course Fee</span>
          <span className="font-medium">{formatPrice(course.price || 0)}</span>
        </div>
        {course && 'original_price' in course && (course.original_price as number) > (course.price || 0) ? (
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-green-600 font-medium">Discount</span>
            <span className="text-green-600 font-medium">
              -{formatPrice((course.original_price as number) - (course.price || 0))}
            </span>
          </div>
        ) : null}

        <div className="border-t border-slate-200 my-2 pt-2 flex justify-between items-center">
          <span className="font-bold text-slate-900">Total</span>
          <span className="font-bold text-lg text-orange-600">{formatPrice(course.price || 0)}</span>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="px-4 pb-4">
        {/* Payment Error */}
        {paymentError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>{paymentError}</div>
          </div>
        )}

        {/* Stripe Payment Element */}
        <div className="mb-6 border border-slate-200 rounded-lg shadow-sm overflow-hidden bg-white">
          <PaymentElement className="p-4" />
        </div>

        {/* Pay Button */}
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay {formatPrice(course.price || 0)} Now
            </>
          )}
        </Button>

        {/* Payment Info */}
        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-slate-500">
          <Lock className="w-3 h-3" />
          <span>Secure payment processed by Stripe</span>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
