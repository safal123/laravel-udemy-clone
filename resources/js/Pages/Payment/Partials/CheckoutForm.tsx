import { Button } from '@/Components/ui/button'
import { Course } from '@/types'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Loader, Loader2 } from 'lucide-react'
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
      <h1 className={'text-xl font-semibold mb-4'}>
        Pay for
        <span className={'text-blue-500'}> {course.title} </span>
        and get access to all chapters.
      </h1>
      <form onSubmit={handleSubmit} className={'border text-white mb-4 rounded-md'}>
        <PaymentElement className={'bg-white p-4 rounded-md'} />
        <div className={'p-4'}>
          <Button
            disabled={isSubmitting}
            type={"submit"}
            className={'w-full'}
          >
            {isSubmitting && <Loader className={'animate-spin w-4 h-4 mr-2'}/>}
            Pay Now for ${course.price}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm;
