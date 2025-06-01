import React, { useEffect } from 'react'
import FeedCard from './FeedCard'
import axios from 'axios'
import { Base_Url } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSilce'


const Home = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(store => store.feed)

  async function handleFeed() {
    const res = await axios.get(Base_Url + "/feed", {
      withCredentials: true
    })

    dispatch(addFeed(res.data.data));
  }
  useEffect(() => {
    handleFeed();
  }, [])



  if (feeds.length == 0) return <h1>Nothing to show</h1>


  return (
    <div className="relative h-[40rem] w-full flex items-center justify-center">
      {
        feeds.map((feed, index) => (
          <div
            key={feed._id}
            className="absolute transition-all duration-300"
            style={{
              top: `${index * 20}px`,      // adjust overlap spacing
              zIndex: feeds.length - index // stack order
            }}
          >
            <FeedCard user={feed} />
          </div>
        ))
      }
    </div>


  )
}

export default Home