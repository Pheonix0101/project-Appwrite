import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import {Outlet} from 'react-router-dom'
import "./App.css";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";


function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoadng] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoadng(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
        todo  <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : 
    null
  
}

export default App;
