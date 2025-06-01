import axios from 'axios';
import React from 'react'
import { Base_Url } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSilce'

const FeedCard = (props) => {
    const dispatch = useDispatch();
    const feed = useSelector(store=>store.feed);
    
    const {_id,firstName,about,photoUrl,skills}=props.user;

    // function removeTopFeed(){
    //     const newFeed = feed;
    //     newFeed = slice(1);
    //     console.log("action dispatch");
        
    //     dispatch(addFeed(newFeed));

    //     console.log(feed);
        
    // }

    function removeFeedOfTop(){
        const newFeedData = feed.slice(1);
        
        dispatch(addFeed(newFeedData))
    }

    async function handleIgnore(){
        const res = await axios.post(Base_Url + `/request/send/ignored/${_id}`,{},{
            withCredentials : true
        })

       removeFeedOfTop();
    }

    async function handleInterested(){
        const res = await axios.post(Base_Url + `/request/send/interested/${_id}`,{},{
            withCredentials : true
        })
        removeFeedOfTop();
    }
    
    return (
        < div className="card bg-base-300 w-96 h-[80%] shadow-sm" >
            <figure className='w-[100%] h-[50%]'>
                <img
                    src={photoUrl}
                    alt="User" 
                    className="h-full w-full object-contain"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName}</h2>
                <p>{about}</p>
                <div className="card-actions justify-between">
                    <button className="btn btn-primary" onClick={handleIgnore}>Ignore</button>
                    <button className="btn btn-secondary" onClick={handleInterested}>Interested</button>
                </div>
            </div>
        </div >
    )
}

export default FeedCard