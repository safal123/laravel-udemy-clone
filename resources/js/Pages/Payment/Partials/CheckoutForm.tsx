import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Course } from '@/types'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Loader, Loader2, Video } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type CheckoutFormProps = {
  course: Course
}

const CheckoutForm = ({course}: CheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitting form')
    try {
      setIsSubmitting(true);
      if (!stripe || !elements) {
        toast.error('Stripe.js has not loaded yet. Make sure to disable any ad blockers.');
        return;
      }
      const {error} = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/courses/${course.slug}`,
        },
      });
      if (error) {
        throw error;
      }
      toast.success('Payment successful');
    } catch (e: any) {
      toast.error(e.message || 'An error occurred', {
        style: {
          background: '#fa4931',
          color: '#fff',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!stripe || !elements) {
    return <div className={'flex items-center justify-center h-72'}>
      <Loader2 className={'animate-spin w-12 h-12'}/>
    </div>
  }

  return (
    <div className={'p-2'}>
      <h1 className={'text-2xl font-semibold mb-4'}>
        Pay for
        <span className={'text-blue-500'}> {course.title} </span>
        and get access to all chapters.
      </h1>
      <form onSubmit={handleSubmit} className={'p-4 bg-gray-100 text-white mb-4 rounded-md'}>
        <PaymentElement className={'bg-white p-4 rounded-md'} />
        <Button
          disabled={isSubmitting}
          type={"submit"}
          className={'w-full mt-4 font-semibold bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 hover:from-emerald-800 hover:via-slate-800 hover:to-rose-800'}
        >
          {isSubmitting && <Loader className={'animate-spin w-4 h-4 mr-2'}/>}
          Pay Now for ${course.price}
        </Button>
      </form>
    </div>
  )
}

export default CheckoutForm;
