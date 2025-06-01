import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Base_Url } from '../utils/constant'
import { addRequests } from '../utils/requestsSlice'

const ConnectionCard = ({ conn }) => {
    const request = useSelector(store => store.requests)
    const dispatch = useDispatch();
    const { toUserId, fromUserId } = conn

    const user = useSelector(store => store.user);
    const connector = fromUserId._id == user._id ? toUserId : fromUserId;

    function removeTopRequest() {
        const newRequest = request.slice(1);
        dispatch(addRequests(newRequest));
    }


    async function handleRejected() {

        try {

            removeTopRequest();
            const res = await axios.post(Base_Url + `/request/review/rejected/${conn._id}`, {}, {
                withCredentials: true
            })

            console.log(res);
        } catch (error) {
            console.log(error);
            
        }



    }

    async function handleAccepted() {

        try {
            removeTopRequest();
            const res = await axios.post(Base_Url + `/request/review/accepted/${conn._id}`, {}, {
                withCredentials: true
            })

            console.log(res);
        } catch (error) {
            console.log(error);

        }



    }


    return (
        <li className="list-row">
            <div><img className="size-10 rounded-box" src={connector.photoUrl} /></div>
            <div>
                <div>{connector.firstName ? connector.firstName : "name"}</div>
                <div className="text-xs opacity-60">age : {connector.age ? connector.age : "na"}</div>
                <div className="text-xs opacity-60">{connector.about ? connector.about : "about"}</div>
            </div>

            <button className="btn btn-square btn-ghost" onClick={handleRejected} >
                X
            </button>
            <button className="btn btn-square btn-ghost" onClick={handleAccepted}>
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>

        </li>

    )
}

export default ConnectionCard