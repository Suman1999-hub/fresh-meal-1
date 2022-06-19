import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import vegmealImage from '../assets/veg-meal.svg';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { useQuery } from 'react-query';
import { axiosInstance } from '../axiosInstance';
import { formatDate } from '../formatDate';
import { useState } from 'react';
import { useAddFeedback } from '../hooks/useAddFeedback';
import { useContext } from 'react';
import { userContext } from '../App';

// const subscriptions = [
//   {
//     name: 'One Month',
//     price: 1500,
//     description: 'You will get meals till 28th day, starting from tomorrow.',
//   },
//   {
//     name: '15 Days',
//     price: 800,
//     description: 'You will get meals till 15th day, starting from tomorrow.',
//   },
//   {
//     name: 'Today',
//     price: 50,
//     description: 'You will get meal just for Today.',
//   },
// ];

const fetchSubscriptions = async () => {
  return await axiosInstance.get(`/api/getMenuSubscriptions/veg`);
};
const fetchFeedback = async () => {
  return await axiosInstance.get(`/api/getFeedback`);
};

export const Veg = () => {
  const {
    data: subscriptions,
    isLoading,
    error,
  } = useQuery(['veg-subscritpions'], fetchSubscriptions);
  const {
    data: feedbacks,
    isFeedbackLoading,
    feedbackError,
    refetch: refetchFeedback,
  } = useQuery(['feedback'], fetchFeedback);
  const { mutate: addFeedback } = useAddFeedback();
  let context = useContext(userContext);

  const [value, setValue] = useState('');

  const createFeedback = () => {
    console.log(value);
    try {
      addFeedback({
        user_id,
        value,
      });
      setValue('');
    } catch (error) {
      console.error('Error happend : ' + error);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl flex flex-col mx-auto mt-20 text-gray-50 px-3 mb-10">
        <div
          className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black px-5 md:px-10 py-5 rounded-xl 
        flex flex-col border-green-500 border-4 pb-16"
        >
          <img
            src={vegmealImage}
            alt="meal"
            className="w-60 h-60 mx-auto -mt-24"
          />
          <p className="text-center text-xl md:text-2xl font-semibold">
            Veg Meal
          </p>
          <h3 className="mt-10 uppercase font-semibold text-sm mb-3">
            Description
          </h3>
          <p className="text-justify text-base">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <h3 className="mt-14 uppercase font-semibold text-sm mb-3">
            Subscriptions
          </h3>
          {!isLoading && (
            <section className="mt-1 grid grid-cols-3 gap-4">
              {subscriptions &&
                subscriptions.data.rows.map((item) => (
                  <SubscriptionCard {...item} key={item.id} />
                ))}
            </section>
          )}
        </div>
        <div
          className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black px-5 md:px-10 py-5 rounded-xl 
        flex flex-col border-green-500 border-2 pb-16 mt-10"
        >
          <p className="text-xl font-semibold">Feedback</p>
          <div className="flex w-full mt-5">
            <input
              className="p-2 rounded-md max-w-2xl text-black"
              value={value}
              disabled={!context.user}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={`p-3 px-8 bg-yellow-600 text-black ml-3 font-semibold rounded-sm ${
                !context.user && 'bg-gray-500'
              }`}
              onClick={createFeedback}
              disabled={!context.user}
            >
              Post
            </button>
          </div>
          {!isFeedbackLoading &&
            feedbacks &&
            feedbacks.data.rows.map((item) => (
              <div className="mt-10" key={item.id}>
                <div>
                  <p className="text-sm">
                    {item.name}{' '}
                    <span className="text-sm text-gray-400">
                      {formatDate(item.created_date)}
                    </span>
                  </p>
                  <p className="mt-2">{item.value}</p>
                </div>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
};
