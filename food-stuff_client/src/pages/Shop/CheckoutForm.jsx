import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { FaPaypal } from "react-icons/fa";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [cardError, setCardError] = useState()
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
      console.log('[PaymentMethod]', paymentMethod);
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
      <div className='md:w-1/3 w-full space-y-5  shrink-0 shadow-2xl backgroundPrimary rounded-l-2xl px-4 py-16 md:translate-y-1/2'>
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
            Pay Now
          </button>
          {
            cardError ? <p className='text-red-500 italic text-xs my-3 float-end'>{cardError}</p> : ''
          }
        </form>

        {/*paypal */}
        <div className='mt-5 text-center'>
          <hr />
          <button className='button' type="submit">
            <FaPaypal />Pay With Paypal
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
