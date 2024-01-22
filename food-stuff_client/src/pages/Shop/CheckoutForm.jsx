import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { FaPaypal } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiPhonepe } from "react-icons/si";
import { FaLongArrowAltRight } from "react-icons/fa";

import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'


const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe()
  const elements = useElements()

  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const [cardError, setCardError] = useState()
  const [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.log('No number Price')
      return
    }

    axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
  }, [price, axiosSecure]);

  // handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
    } else {
      setCardError("success!")
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown'
          },
        },
      }
    )

    if (confirmError) {
      console.log(confirmError)
    }
    console.log(paymentIntent)
    if (paymentIntent.status === 'succeeded') {
      console.log(paymentIntent.id)
      setCardError(`Your transactionId is ${paymentIntent.id}`)
    }
  };

  return (
    <div className='flex flex-col sm:flex-row  justify-between items-start gap-8 py-24 text-[#0E3E4E] '>
      {/*left*/}
      <div className='md:w-1/2 w-full backgroundPrimary rounded-r-2xl pl-14 pr-4 py-8 space-y-3 shadow-2xl'>
        <h4 className=' text-xl font-semibold'>Order Summary</h4>
        <div className='flex justify-between'><p>Total Items:</p> <span>{cart.length}</span></div>
        <div className='flex justify-between'><p>Total Price:</p> <span>{price}$ <hr /></span></div>

      </div>
      {/*right*/}
      <div className='md:w-1/3 w-full space-y-5  shrink-0 shadow-2xl backgroundPrimary rounded-l-2xl px-10 py-16 md:translate-y-1/2 '>
        <h4 className='text-xl font-semibold'>Process Your Payment</h4>
        <h5 className='font-medium'>Credit/Debit Card</h5>

        {/*stripe*/}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#0E3E4E',
                  '::placeholder': {
                    color: '#0E3E4E',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button className='w-full mt-5 button' type="submit" disabled={!stripe}>
            Pay Now<FaLongArrowAltRight />
          </button>
          {
            cardError ? <p className='text-red-500 italic text-xs my-3 float-end'>{cardError}</p> : ''
          }
        </form>

        {/*paypal */}
        <hr />
        <div className='mt-5 text-center flex md:flex-row flex-wrap justify-center items-center gap-2'>

          <button className='button' type="submit">
            <SiPhonepe className='text-[#6739B7]' />Pay
          </button>

          <button className='button' type="submit">
            <FcGoogle />Pay
          </button>

          <button className='button' type="submit">
            <FaPaypal className='text-[#012169]' /><span className='text-[#012169]'>Pay</span><span className='text-[#253B80]'>With</span><span className='text-[#169BD7]'>Paypal</span>
          </button>

        </div>

      </div>
    </div>
  )
}

export default CheckoutForm
