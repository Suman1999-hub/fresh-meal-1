import React, { useContext } from 'react';
import { MdAccountCircle, MdDelete } from 'react-icons/md';
import { useQuery } from 'react-query';
import { userContext } from '../App';
import { axiosInstance } from '../axiosInstance';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const fetchSubscription = async () => {
  return await axiosInstance.get(`/api/getSubscriptions`);
};

export const Admin = () => {
  let context = useContext(userContext);
  const {
    data,
    isLoading,
    error,
  } = useQuery(["admin"], fetchSubscription);

  return (
    <>
      <Header />
      <main className="max-w-7xl flex flex-col mx-auto mt-10 text-gray-50 px-3 mb-10">
        <div
          className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black px-5 md:px-10 py-5 rounded-xl 
        flex flex-col border-green-500 border-2 pb-16 mt-10"
        >
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold">Admin Panel</h1>
            <button
              className="bg-red-500 px-3 py-2 mt-4 md:ml-3 rounded-md shadow-lg 
            shadow-red-500/50 font-semibold text-sm md:text-base ml-auto hidden"
            >
              Edit Menu
            </button>
          </div>
          <div className="mt-10">
            <div className="flex gap-5 items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center">
                <div>
                  <MdAccountCircle className="text-5xl text-green-500" />
                </div>
              </div>
              <p className="text-2xl font-semibold">{context.user.name}</p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-5">
              <div className="bg-yellow-600 rounded-md h-32 text-center p-5">
                <p className="text-6xl font-semibold mb-3">{JSON.stringify(data?.data?.totalSubscriptions)}</p>
                <p className="font-semibold">Total Order</p>
              </div>
              <div className="bg-green-600 rounded-md h-32 text-center p-5">
                <p className="text-6xl font-semibold mb-3">{JSON.stringify(data?.data?.totalMixedSubscriptions)}</p>
                <p className="font-semibold">Veg Meal</p>
              </div>
              <div className="bg-red-600 rounded-md h-32 text-center p-5">
                <p className="text-6xl font-semibold mb-3">{JSON.stringify(data?.data?.totalVegSubscriptions)}</p>
                <p className="font-semibold">Mixed Meal</p>
              </div>
            </div>
            <p className="font-semibold mt-10 mb-5">Subscriptions Table</p>
            <div>
              <table className="w-full">
                <tr className="border h-10 overflow-scroll">
                  <th className="w-10">User Id</th>
                  <th className="w-10">Timing</th>
                  <th className="w-10">Cost</th>
                  <th className="w-10">Menu Id</th>
                </tr>
                {!isLoading && data.data.rows.map(item => (

                <tr className="text-center border overflow-scroll h-10">
                  <td className="w-10">{JSON.stringify(item.user_id)}</td>
                  <td className="w-10">{item?.count}</td>
                  <td className="w-10">
                    {item?.value}
                  </td>
                  <td className="w-10">{item?.menu_id}</td>
                </tr> ))}
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
