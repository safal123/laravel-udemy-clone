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
import { Loader2 } from 'lucide-react'
import React, { useCallback, useState } from 'react'

interface PaymentModalProps {
  course: any
}

const stripePromise = loadStripe('pk_test_51PY3wiCKzGstGhEeysB3zOfMD1Wuv76IwA2xjkXvj9rZD69KIH0P17d731dvSYm6mxwgmEpU10iM0wbhZaLpo6z800uhwx77KX')

const PaymentModal = ({course}: PaymentModalProps) => {
  const [clientSecret, setClientSecret] = useState()

  const fetchClientSecret = useCallback(async () => {
    await axios.get(route('payment.client-secret'), {
      params: {
        course: course.id
      }
    }).then((res) => {
      console.log(res.data)
      setClientSecret(res.data.clientSecret)
    })
  }, [])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={'w-full mt-4'}
          onClick={() => fetchClientSecret()}>
          Pay now
        </Button>
        {/*vite get the env stripe*/}
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Make Payment
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        {
          clientSecret ?
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm course={course}/>
          </Elements> :
          <div className={'flex items-center justify-center h-72'}>
            <Loader2 className={'animate-spin w-12 h-12'}/>
          </div>
        }
      </div>
      <DialogFooter className={'px-4 md:p-0'}>
        <DialogClose asChild>
          <Button variant={'destructive'}>
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
      </DialogContent>
    </Dialog>
)
}

export default PaymentModal
