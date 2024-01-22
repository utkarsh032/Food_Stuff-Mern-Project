import React from 'react'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../hooks/useCart'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const [cart] = useCart()
  // totalPrices
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)
  const totalPrice = parseFloat(cartTotal.toFixed(2))
  return (
    <div className='max-w-screen-2xl  mx-auto h-screen  bg-gradient-to-br from-[#CFFDFB] to-[#AF85E4]'>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  )
}

export default Payment
