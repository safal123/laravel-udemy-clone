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
import { useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

interface PaymentModalProps {
  course: any
}

const PaymentModal = ({course}: PaymentModalProps) => {
  const stripe = useStripe()
  const elements = useElements()

  if (!stripe || !elements || !course) {
    return <div>Loading</div>
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={'w-full mt-4'}>Pay now</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-3xl overflow-y-auto my-12">
        <DialogHeader>
          <DialogTitle>
            Make Payment
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CheckoutForm course={course}/>
        </div>
        <DialogFooter>
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
