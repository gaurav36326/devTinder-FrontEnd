import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { Base_Url } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSilce'
import store from '../utils/store'


const Body = () => {
  const userData = useSelector(store=>store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  async function fetchUser() {
    try {
      const res = await axios.get(Base_Url + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {

      console.error("Failed to fetch user:", error.response?.data || error.message);
      navigate("/login")

    }
  }

  useEffect(() => {
    if(!userData){
      fetchUser()
    }  
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
