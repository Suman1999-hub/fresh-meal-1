import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../axiosInstance';
import { Header } from '../components/Header';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      await axiosInstance.post('/auth/register', formData);
      navigate('/signin');
    } catch (error) {
      console.error('Error happend : ' + error);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl flex flex-col mx-auto mt-10 text-gray-50 px-3 mb-20">
        <p className="text-3xl font-semibold my-10">Sign Up</p>
        <form className="flex flex-col gap-8" onSubmit={signUp}>
          <input
            className="px-3 py-5 h-11 max-w-sm rounded-md text-black"
            placeholder="Full Name"
            defaultValue={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            placeholder="Address"
            defaultValue={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <input
            className="px-3 py-5 h-11 max-w-sm rounded-md text-black"
            placeholder="Password"
            defaultValue={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            className="w-32 bg-green-500 py-5 rounded-full font-semibold shadow-lg 
          shadow-green-500/50"
          >
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
};
