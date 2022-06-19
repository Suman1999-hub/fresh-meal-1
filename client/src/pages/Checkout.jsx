import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { checkoutDataContext } from '../App';
import { axiosInstance } from '../axiosInstance';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  let checkoutContext = useContext(checkoutDataContext);

  const checkOut = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axiosInstance.post('/payment/create-order', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: checkoutContext.checkoutData.price * 100,
        });
        const { amount, id: order_id, currency } = result.data;
        const razorpayKey = 'rzp_test_n9TkHQwv8l54Oy';
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: 'INR',
          //   name: 'example name',
          //   description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            const result = await axiosInstance.post('/payment/pay-order', {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
          },
          //   prefill: {
          //     name: 'example name',
          //     email: 'email@example.com',
          //     contact: '111111',
          //   },
          //   notes: {
          //     address: 'example address',
          //   },
          theme: {
            color: '#80c0f0',
          },
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div>
      <Header />
      <main className="max-w-7xl flex flex-col mx-auto mt-20 text-gray-50 px-3 mb-10">
        <div
          className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black px-5 md:px-10 py-5 rounded-xl 
        flex flex-col border-green-500 border-2 pb-16 mt-10"
        >
          <p className="text-2xl font-semibold">Checkout</p>
          <div className="flex flex-col gap-8 mt-20">
            <input
              className="px-3 py-5 h-11 max-w-sm rounded-md text-black"
              placeholder="Full Name"
              defaultValue={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              className="px-3 py-5 h-11 max-w-sm rounded-md text-black"
              placeholder="Email"
              defaultValue={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              className="px-3 py-5 h-11 max-w-sm rounded-md text-black"
              placeholder="Phone"
              defaultValue={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              className="px-3 py-5 h-11 max-w-sm rounded-md text-black"
              placeholder="Amount"
              type="number"
              value={checkoutContext.checkoutData.price}
              disabled
            />
            <button
              className="w-32 bg-green-500 py-5 rounded-full font-semibold shadow-lg 
                shadow-green-500/50"
              onClick={checkOut}
            >
              Pay
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
