import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { userContext } from '../App';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { axiosInstance } from '../axiosInstance';

const fetchProfile = async ({ queryKey }) => {
  const userId = queryKey[1];
  return await axiosInstance.get(`/api/getUserProfile/${userId}`);
};

export const Profile = () => {
  let context = useContext(userContext);
  console.log(context.user.id);
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery(['profile', context.user.id], fetchProfile);

  if (isLoading) return null;

  return (
    <>
      <Header />
      <main className="max-w-7xl flex flex-col mx-auto mt-10 text-gray-50 px-3 mb-10">
        <div
          className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black px-5 md:px-10 py-5 rounded-xl 
        flex flex-col border-green-500 border-2 pb-16 mt-10"
        >
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold">Profile</h1>
            <button
              className="bg-red-500 px-3 py-2 mt-4 md:ml-3 rounded-md shadow-lg 
            shadow-red-500/50 font-semibold text-sm md:text-base ml-auto"
            >
              Edit
            </button>
          </div>
          <div className="mt-10">
            <div className="flex gap-5 items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center">
                <div>
                  <MdAccountCircle className="text-5xl text-green-500" />
                </div>
              </div>
              <p className="text-2xl font-semibold">
                {profile.data.rows[0].name}
              </p>
            </div>
            <div className="mt-10 px-3 grid grid-cols-2 max-w-lg gap-5">
              <div>
                <p className="text-sm uppercase font-semibold">Phone</p>
                <p className="text-xl mt-1">{profile.data.rows[0].phone}</p>
              </div>
              <div>
                <p className="text-sm uppercase font-semibold">Email</p>
                <p className="text-xl mt-1">abc@gmai.com</p>
              </div>
              <div>
                <p className="text-sm uppercase font-semibold">Subscription</p>
                <p className="text-xl mt-1"></p>
              </div>
              <div>
                <p className="text-sm uppercase font-semibold">Address</p>
                <p className="text-xl mt-1">{profile.data.rows[0].address}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
