import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from './ProfileCard'
import { useEffect } from 'react';
import axios from 'axios'
import {Base_Url} from '../utils/constant.js'
import {addRequests} from '../utils/requestsSlice.js'

const ConnectionCard = () => {

    const user = useSelector(store => store.user);
    const requests = useSelector(store => store.requests);
    const dispatch = useDispatch();

    const fetchReviewRequest =async ()=>{
        const res = await axios.get(Base_Url+"/user/requests/received",{
            withCredentials : true
        })
        dispatch(addRequests(res.data.data));  
    }

    useEffect(()=>{
        fetchReviewRequest()
    },[])

    if (!user) return <h1>No user Found</h1>
    
    if(requests.length===0) return <h1>No connection requests</h1>


    return (
        <ul className="list bg-base-100 rounded-box shadow-md w-[50%] m-auto">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">people who want to connect you</li>

           { requests.map(
                (req) =>{ return(<ProfileCard key={req._id} conn={req} />)
                }
            )}
          
        </ul>


    )
}

export default ConnectionCard