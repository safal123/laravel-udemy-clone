import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button} from "@/Components/ui/button";
import {toast} from "sonner";
import React from "react";
import {Course} from "@/types";
import { Loader, Loader2, Video } from 'lucide-react'
import {Badge} from "@/Components/ui/badge";

type CheckoutFormProps = {
  course: Course
}

const CheckoutForm = ({course}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting form');
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
    <div className={'p-6'}>
      <h1 className={'text-2xl font-semibold mb-4'}>
        Pay for
        <span className={'text-blue-500'}> {course.title} </span>
        and get access to all chapters.
      </h1>
      <form onSubmit={handleSubmit} className={'p-4 bg-gray-900 text-white mb-4 rounded-md'}>
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
      <div className={'mt-2 max-h-[400px] overflow-y-scroll'}>
        <h1 className={'text-xl font-semibold'}>
          Chapters
        </h1>
        {course.chapters.map((chapter, index) => (
          <div key={chapter.id} className={'p-4 bg-gray-900 my-2 flex items-center rounded-md'}>
            <span className={'text-gray-100 text-lg font-semibold mr-1'}>{index + 1}.</span>
            <h2 className={'text-lg font-semibold'}>
              {chapter.title}
              {chapter.is_free &&
                <Badge variant={'outline'} className={'ml-4 text-white'}>
                  Free
                </Badge>
              }
              <br/>
            </h2>
            <div className={'ml-auto'}>
              {chapter.is_free &&
                <Badge variant={'outline'} className={'bg-gradient text-white'}>
                  <Video className={'w-6 h-6 text-gradient'}/>
                </Badge>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckoutForm;
