import { FiCheckCircle } from 'react-icons/fi';
import { FaHeartbeat, FaMoneyBillWave } from 'react-icons/fa';
import { SiIfood } from 'react-icons/si';
import { MdDeliveryDining } from 'react-icons/md';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import vegmealImage from '../assets/veg-meal.svg';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <>
      <Header showUl={true} />
      <main className="max-w-7xl flex flex-col mx-auto mt-10 text-gray-50 px-3">
        <section className="flex items-center justify-around w-full mt-10 md:mt-20 mb-10">
          <div>
            <p className="text-sm md:text-base font-semibold uppercase">
              😍 Easy way to order your meals
            </p>
            <h1 className="text-4xl md:text-6xl mt-2 font-semibold md:max-w-md leading-[3rem] md:leading-[4rem]">
              Order Tasty & Fresh food{' '}
              <span className="text-red-400">anytime!</span>
            </h1>
            <p className="mt-5 md:mt-12 max-w-xs md:max-w-sm text-sm md:text-base">
              Just confirm your meal and enjoy delicious and healthy foods.
            </p>
            <button className="bg-red-500 p-5 rounded-full mt-12 font-semibold shadow-lg shadow-red-500/50">
              Check meals
            </button>
          </div>
          <div className="hidden md:block">
            <img src={vegmealImage} alt="meal" className="max-w-xl max-h-xl" />
          </div>
        </section>
        <section className="mt-32 w-full">
          <h3 className="text-center font-semibold text-3xl mb-20">meals</h3>
          <div className="flex gap-5 md:gap-8">
            <div
              className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black px-3 py-5
               h-96 w-full sm:w-1/2 md:w-80 rounded-xl text-center flex flex-col"
            >
              <img
                src={vegmealImage}
                alt="meal"
                className="w-52 h-52 mx-auto -mt-24"
              />
              <h5 className="font-semibold">Special Veg Meal</h5>
              <ul className="mt-8 px-3 text-green-400 flex flex-col gap-y-3">
                <li className="flex items-center gap-x-2 text-sm md:text-base">
                  <FiCheckCircle />
                  <p>Pure Veg Meal always</p>
                </li>
                <li className="flex items-center gap-x-2 text-sm md:text-base">
                  <FiCheckCircle />
                  <p>Pure Veg Meal always</p>
                </li>
              </ul>
              <p className="text-center mt-auto underline underline-offset-4 text-sm md:text-base font-semibold">
                <Link to="/veg">View details</Link>
              </p>
            </div>
            <div
              className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black px-3 py-5
               h-96 w-full sm:w-1/2 md:w-80 rounded-xl text-center flex flex-col"
            >
              <img
                src={vegmealImage}
                alt="meal"
                className="w-52 h-52 mx-auto -mt-24"
              />
              <h5 className="font-semibold">Special Mixed Meal</h5>
              <ul className="mt-8 px-3 text-green-400 flex flex-col gap-y-3">
                <li className="flex items-center gap-x-2 text-sm md:text-base">
                  <FiCheckCircle />
                  <p>Pure Veg Meal always</p>
                </li>
                <li className="flex items-center gap-x-2 text-sm md:text-base">
                  <FiCheckCircle />
                  <p>Pure Veg Meal always</p>
                </li>
              </ul>
              <p className="text-center mt-auto underline underline-offset-4 text-sm md:text-base font-semibold">
                <Link to="/mixed">View details</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="mt-32 w-full px-2">
          <h3 className="text-center font-semibold text-3xl mb-20">Why Us</h3>
          <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-center">
            <div className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black w-full flex md:w-1/3 md:max-w-sm p-8 rounded-xl">
              <div>
                <FaHeartbeat className="text-5xl text-red-500" />
              </div>
              <div className="pl-3 h-20 cursor-pointer">
                <p className="text-2xl font-semibold">Healthy</p>
                <p className="mt-2 text-sm">
                  Cleopatra is the brand new album from The Lumineers
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black w-full flex md:w-1/3 md:max-w-sm p-8 rounded-xl">
              <div>
                <SiIfood className="text-5xl text-pink-500" />
              </div>
              <div className="pl-3 h-20 cursor-pointer">
                <p className="text-2xl font-semibold">Teasty</p>
                <p className="mt-2 text-sm">
                  Cleopatra is the brand new album from The Lumineers
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black w-full flex md:w-1/3 md:max-w-sm p-8 rounded-xl">
              <div>
                <FaMoneyBillWave className="text-5xl text-green-500" />
              </div>
              <div className="pl-3 h-20 cursor-pointer">
                <p className="text-2xl font-semibold">Affordable</p>
                <p className="mt-2 text-sm">
                  Cleopatra is the brand new album from The Lumineers
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black w-full flex md:w-1/3 md:max-w-sm p-8 rounded-xl">
              <div>
                <MdDeliveryDining className="text-5xl text-yellow-500" />
              </div>
              <div className="pl-3 h-20 cursor-pointer">
                <p className="text-2xl font-semibold">Delivery on Time</p>
                <p className="mt-2 text-sm">
                  Cleopatra is the brand new album from The Lumineers
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="my-32 w-full px-2">
          <h3 className="text-center font-semibold text-3xl mb-10">Contact</h3>
          <div className="flex flex-col items-center md:flex-row md:justify-around gap-5 bg-gray-700 py-10 rounded-full shadow-md shadow-red-500">
            <div>
              <div className="flex items-center gap-2">
                <HiOutlineMail className="text-3xl text-red-500" />
                <p className="text-xl text-red-500 uppercase">Email</p>
              </div>
              <p className="text-xl mt-3 ml-1">
                <a href="to:contact@freshmeal.com">contact@freshmeal.com</a>
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <HiOutlinePhone className="text-3xl text-green-500" />
                <p className="text-xl text-green-500 uppercase">Call</p>
              </div>
              <p className="text-xl mt-3 ml-1">
                <a href="tel:1234567890">1234567890</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
