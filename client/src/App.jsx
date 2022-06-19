import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Veg } from './pages/Veg';
import { Mixed } from './pages/Mixed';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { Signup } from './pages/Signup';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Signin } from './pages/SignIn';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserProtected } from './components/UserProtected';
import { OnlyAuthUser } from './components/OnlyAuthUser';
import { Checkout } from './pages/Checkout';

const queryClient = new QueryClient();

export const userContext = createContext();
export const checkoutDataContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [checkoutData, setCheckoutData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    const fetchedUser = JSON.parse(localUser);
    setUser(fetchedUser);
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <userContext.Provider value={{ user, setUser }}>
        <checkoutDataContext.Provider value={{ checkoutData, setCheckoutData }}>
          <div className="bg-slate-800 min-h-screen">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/veg" element={<Veg />} />
                <Route path="/mixed" element={<Mixed />} />
                <Route
                  path="/profile"
                  element={
                    <OnlyAuthUser>
                      <Profile />
                    </OnlyAuthUser>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <OnlyAuthUser>
                      <Admin />
                    </OnlyAuthUser>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <UserProtected>
                      <Signup />
                    </UserProtected>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <UserProtected>
                      <Signin />
                    </UserProtected>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <OnlyAuthUser>
                      <Checkout />
                    </OnlyAuthUser>
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
        </checkoutDataContext.Provider>
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
