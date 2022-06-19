import { GiHotMeal } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../App';
import { MdAccountCircle } from 'react-icons/md';

export const Header = ({ showUl = false }) => {
  let context = useContext(userContext);
  let navigate = useNavigate();
  const setUser = context.setUser;

  const logout = async () => {
    localStorage.clear('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="text-gray-50 h-20 flex items-center justify-between md:px-6 px-2 mx-auto">
      <Link to="/">
        <div className="flex items-center">
          <GiHotMeal className="md:text-5xl text-5xl text-red-400" />
          <h3 className="md:text-2xl text-xl pt-5 ml-2 font-semibold">
            Fresh Meal
          </h3>
        </div>
      </Link>
      <div className="flex items-center h-full align-middle mt-2">
        {showUl && (
          <ul className="md:flex gap-x-3 md:text-base text-sm mt-4 hidden">
            <li>Meal</li>
            <li>Why Us</li>
            <li>Contact</li>
            <li>FAQ</li>
            <li></li>
          </ul>
        )}
        {context.user && (
          <div className="flex">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center mt-4">
              <Link to="/profile">
                <div>
                  <MdAccountCircle className="text-3xl text-green-500" />
                </div>
              </Link>
            </div>
            <button
              className="bg-red-500 px-3 py-2 mt-4 md:ml-3 rounded-md shadow-lg 
            shadow-red-500/50 font-semibold text-sm md:text-base"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        )}
        {!context.user && (
          <>
            <Link to="/signin">
              <button className="mt-4 md:ml-5 mr-4 md:mr-1 text-sm md:text-base">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-green-500 px-3 py-2 mt-4 md:ml-3 rounded-md shadow-lg shadow-green-500/50 font-semibold text-sm md:text-base">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
