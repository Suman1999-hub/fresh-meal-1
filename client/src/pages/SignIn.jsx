import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../App';
import { axiosInstance } from '../axiosInstance';
import { Header } from '../components/Header';
import { toast } from 'react-toastify';

export const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let context = useContext(userContext);

  const signIn = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axiosInstance.post('/auth/signin', formData);
      const user = response.data.user;
      const { setUser } = context;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Signin successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      console.error('Wrong Email/Password');
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl flex flex-col mx-auto mt-10 text-gray-50 px-3 mb-20">
        <p className="text-3xl font-semibold my-10">Sign In</p>
        <form className="flex flex-col gap-8" onSubmit={signIn}>
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
            Sign In
          </button>
        </form>
      </main>
    </>
  );
};
